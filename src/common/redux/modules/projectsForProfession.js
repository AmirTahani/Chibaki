import { put } from 'redux-saga/effects';

export const LOAD = 'ssr/ProjectsForProfession/LOAD';
export const LOAD_SUCCESS = 'ssr/ProjectsForProfession/LOAD_SUCCESS';
export const LOAD_FAILURE = 'ssr/ProjectsForProfession/LOAD_FAILURE';

const initialState = {
    loading: false,
    loaded: false,
    ProjectsForProfession: [],
    error: null,
    pagination: 0,
    count: 0

};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                loading: true,
            };
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                ProjectsForProfession: action.response.jobs,
                pagination: action.response.meta.page,
                count: action.response.meta.total_count
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


export function load(professionId, provinceId, resolve, reject) {
    return {
        type: LOAD,
        resolve,
        reject,
        professionId,
        provinceId
    };
}

export function loadProvincesSuccess(response) {
    return {
        type: LOAD_SUCCESS,
        response
    };
}

export function loadProvincesFailure(error) {
    return {
        type: LOAD_FAILURE,
        error
    };
}

export function* watchLoad(client, { resolve, reject, professionId, provinceId }) {
    try {
        const response = yield client.get(`/v1/jobs?profession=${professionId}${provinceId ? `&province=${provinceId}` : ''}`);
        yield put(loadProvincesSuccess(response.data));
        resolve && resolve();
    } catch (error) {
        yield put(loadProvincesFailure(error));
        reject && reject();
    }
}
