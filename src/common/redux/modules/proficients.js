import { put } from 'redux-saga/effects';
import { END } from 'redux-saga';
import { handleSagaError } from '../../utils/handleSagaError';

export const LOAD_PROFICIENTS = 'ssr/proficients/LOAD_PROFICIENTS';
export const LOAD_PROFICIENTS_SUCCESS = 'ssr/proficients/LOAD_PROFICIENTS_SUCCESS';
export const LOAD_PROFICIENTS_FAILURE = 'ssr/proficients/LOAD_PROFICIENTS_FAILURE';

const initialState = {
    loading: false,
    loaded: false,
    proficients: [],
    error: null,
    pagination: {},
    count: 0,
    title: '',
    selectedProfession: {}
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD_PROFICIENTS:
            return {
                ...state,
                loading: true,
                title: action.title,
                selectedProfession: action.selectedProfession
            };
        case LOAD_PROFICIENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                proficients: action.response.results,
                pagination: action.response.pagination,
                count: action.response.count
            };
        case LOAD_PROFICIENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function load(professionId, title, selectedProfession) {
    return {
        type: LOAD_PROFICIENTS,
        professionId,
        title,
        selectedProfession
    };
}

export function loadSuccess(response) {
    return {
        type: LOAD_PROFICIENTS_SUCCESS,
        response
    };
}

export function loadFailure(error) {
    return {
        type: LOAD_PROFICIENTS_FAILURE,
        error
    };
}

export function* watchLoadProficients(client, { professionId }) {
    try {
        const response = yield client.get(`/professions/${professionId}/proficients`);
        yield put(loadSuccess(response.data));
        yield put(END);
    } catch (error) {
        handleSagaError(error);
        yield put(loadFailure(error));
    }
}
