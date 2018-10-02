import { put } from 'redux-saga/effects';

export const LOAD_PROVINCES = 'ssr/provinces/LOAD_PROVINCES';
export const LOAD_PROVINCES_SUCCESS = 'ssr/provinces/LOAD_PROVINCES_SUCCESS';
export const LOAD_PROVINCES_FAILURE = 'ssr/provinces/LOAD_PROVINCES_FAILURE';

const initialState = {
    loading: false,
    loaded: false,
    provinces: [],
    error: null
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD_PROVINCES:
            return {
                ...state,
                loading: true,
            };
        case LOAD_PROVINCES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                provinces: action.provinces
            };
        case LOAD_PROVINCES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}


export function loadProvinces() {
    return {
        type: LOAD_PROVINCES
    };
}

export function loadProvincesSuccess(provinces) {
    return {
        type: LOAD_PROVINCES_SUCCESS,
        provinces
    };
}

export function loadProvincesFailure(error) {
    return {
        type: LOAD_PROVINCES_FAILURE,
        error
    };
}

export function* watchLoadProvinces(client) {
    try {
        const response = yield client.get('/provinces');
        yield put(loadProvincesSuccess(response.data));
    } catch (error) {
        yield put(loadProvincesFailure(error));
    }
}