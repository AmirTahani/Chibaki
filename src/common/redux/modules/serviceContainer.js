import { put, take, select } from 'redux-saga/effects';
import { loadCategories, LOAD_CATEGORIES_SUCCESS } from './professions';
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
        let Provinces = yield select(state => state.provinces.provinces);
        let professions = yield select(state => state.professions.flattenProfessionsByCategories);

        if (Provinces.length === 0) {
            yield put(loadProvinces());
        }
        if (professions.length === 0) {
            yield put(loadCategories());
        }
        if (Provinces.length === 0) {
            yield take(LOAD_PROVINCES_SUCCESS);
        }
        if (professions.length === 0) {
            yield take(LOAD_CATEGORIES_SUCCESS);
        }

        Provinces = yield select(state => state.provinces.provinces);
        let foundProvince = {};
        if (query && query.city) {
            foundProvince = Provinces.find(item => item.name === query.city.replace('_', ' '));
        }
        professions = yield select(state => state.professions.flattenProfessionsByCategories);
        let professionId = '';
        let selectedProfession = {};
        professions.forEach((profession) => {
            if (decodeURI(routeTitle) === profession.title) {
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
        console.log(error);
        yield put(loadFailure(error));
        reject && reject();
    }
}