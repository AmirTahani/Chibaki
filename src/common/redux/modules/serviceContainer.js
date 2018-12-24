import { put, take, select, all } from 'redux-saga/effects';
import { loadCategories, LOAD_CATEGORIES_SUCCESS, loadProfessions, LOAD_PROFESSIONS_SUCCESS } from './professions';
import { loadProvinces, LOAD_PROVINCES_SUCCESS } from './provinces';
import { load as loadProficients, LOAD_PROFICIENTS_SUCCESS } from './proficients';
import { load as loadProjectsForProf, LOAD_SUCCESS as projectsLoadedSuccess } from './projectsForProfession';

import Professions from '../../utils/professions';

export const LOAD = 'ssr/serviceContainer/LOAD';
export const LOAD_SUCCESS = 'ssr/serviceContainer/LOAD_SUCCESS';
export const LOAD_FAILURE = 'ssr/serviceContainer/LOAD_FAILURE';

export const SAVE_TITLE = 'ssr/serviceContainer/SAVE_TITLE';

const initialState = {
    loading: false,
    loaded: false,
    error: null,
    relatedProfessions: [],
    title: ''
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
                relatedProfessions: action.relatedProfessions
            };
        case LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case SAVE_TITLE:
            return {
                ...state,
                title: action.title ? action.title.split('_').join(' ') : state.title
            };
        default:
            return state;
    }
}

export function saveTitle(title) {
    return {
        type: SAVE_TITLE,
        title
    };
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

export function loadSuccess(relatedProfessions) {
    return {
        type: LOAD_SUCCESS,
        relatedProfessions
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
        yield put(saveTitle(decodeURI(routeTitle)));

        const title = decodeURI(routeTitle)
            .split('_')
            .join(' ');
        let professionsFlatChildren = yield select(state => state.professions.professionsFlatChildren);
        let Provinces = yield select(state => state.provinces.provinces);
        let categories = yield select(state => state.professions.categories);

        if (!Provinces.length) {
            yield put(loadProvinces());
        }
        if (!categories.length || !professionsFlatChildren.length) {
            yield put(loadProfessions());
        }
        if (!Provinces.length) {
            yield take(LOAD_PROVINCES_SUCCESS);
        }
        if (!categories.length || !professionsFlatChildren.length) {
            yield take(LOAD_PROFESSIONS_SUCCESS);
        }
        categories = yield select(state => state.professions.categories);
        Provinces = yield select(state => state.provinces.provinces);
        professionsFlatChildren = yield select(state => state.professions.professionsFlatChildren);
        let foundProvince = {};
        if (query && query.province) {
            foundProvince = Provinces.find(item => item.name === query.province);
        }
        const Profession = new Professions(categories, professionsFlatChildren);
        Profession.select(title);
        const selectedProfession = Profession.selected.parent;
        const relatedProfessions = Profession.selected.related;
        yield put(loadProjectsForProf(selectedProfession._id, foundProvince && foundProvince._id));
        yield put(
            loadProficients(
                selectedProfession._id,
                decodeURI(routeTitle),
                selectedProfession,
                foundProvince && foundProvince._id
            )
        );
        yield all([take(projectsLoadedSuccess), take(LOAD_PROFICIENTS_SUCCESS)]);
        yield put(loadSuccess(relatedProfessions));
        resolve && resolve('done');
    } catch (error) {
        yield put(loadFailure(error));
        reject && reject();
    }
}
