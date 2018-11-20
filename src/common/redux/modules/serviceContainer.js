import { put, take, select } from 'redux-saga/effects';
import { loadCategories, LOAD_CATEGORIES_SUCCESS, loadProfessions, LOAD_PROFESSIONS_SUCCESS } from './professions';
import { loadProvinces, LOAD_PROVINCES_SUCCESS } from './provinces';
import { load as loadProficients, LOAD_PROFICIENTS_SUCCESS } from './proficients';
import { load as loadProjectsForProf, LOAD_SUCCESS as projectsLoadedSuccess } from './projectsForProfession';

export const LOAD = 'ssr/serviceContainer/LOAD';
export const LOAD_SUCCESS = 'ssr/serviceContainer/LOAD_SUCCESS';
export const LOAD_FAILURE = 'ssr/serviceContainer/LOAD_FAILURE';

const initialState = {
    loading: false,
    loaded: false,
    error: null
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                loading: true,
                loaded: false
            };
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
            };
        case LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}


export function load(resolve, reject, query, routeTitle) {
    return {
        type: LOAD,
        resolve,
        reject,
        query,
        routeTitle
    };
}

export function loadSuccess() {
    return {
        type: LOAD_SUCCESS,

    };
}

export function loadFailure(error) {
    return {
        type: LOAD_FAILURE,
        error
    };
}

export function* watchLoad(client, { resolve, reject, query, routeTitle }) {
    try {
        const title = decodeURI(routeTitle).split('_').join(' ');
        let Provinces = yield select(state => state.provinces.provinces);
        const categories = yield select(state => state.professions.categories);

        if (!Provinces.length) {
            yield put(loadProvinces());
        }
        if (!categories.length) {
            yield put(loadCategories());
        }
        if (!Provinces.length) {
            yield take(LOAD_PROVINCES_SUCCESS);
        }
        if (!categories.length) {
            yield take(LOAD_CATEGORIES_SUCCESS);
        }

        Provinces = yield select(state => state.provinces.provinces);
        let foundProvince = {};
        if (query && query.province) {
            foundProvince = Provinces.find(item => item.name === query.province);
        }
        const flatProfessions = yield select(state => state.professions.flattenProfessionsByCategories);
        let professionId = '';
        let selectedProfession = {};
        flatProfessions.forEach((profession) => {
            if (title === profession.title) {
                professionId = profession._id;
                selectedProfession = profession;
            }
        });
        yield put(loadProjectsForProf(professionId, foundProvince && foundProvince._id));
        yield put(loadProficients(professionId, decodeURI(routeTitle), selectedProfession, foundProvince && foundProvince._id));
        yield take(projectsLoadedSuccess);
        yield take(LOAD_PROFICIENTS_SUCCESS);
        yield put(loadSuccess());
        resolve && resolve('done');
    } catch (error) {
        yield put(loadFailure(error));
        reject && reject();
    }
}
