import { put } from 'redux-saga/effects';
import { END } from 'redux-saga';
import { handleSagaError } from '../../utils/handleSagaError';

export const LOAD_PROFESSIONAL = 'ssr/professional/LOAD_PROFESSIONAL';
export const LOAD_PROFESSIONAL_SUCCESS = 'ssr/professional/LOAD_PROFESSIONAL_SUCCESS';
export const LOADED_COMMENTS = 'ssr/professional/LOADED_COMMENTS';
export const LOAD_PROFESSIONAL_FAILURE = 'ssr/professional/LOAD_PROFESSIONAL_FAILURE';

const initialState = {
    loading: false,
    loaded: false,
    professional: [],
    error: null,
    comments: []
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD_PROFESSIONAL:
            return {
                ...state,
                loading: true,
            };
            case LOADED_COMMENTS:
            return {
                ...state,
                comments: action.comments,
            };
        case LOAD_PROFESSIONAL_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                professional: action.response,
            };
        case LOAD_PROFESSIONAL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function load(professionalId) {
    return {
        type: LOAD_PROFESSIONAL,
        professionalId,
    };
}

export function loadComments(comments){
    return {
        type: LOADED_COMMENTS,
        comments
    }
}

export function loadSuccess(response) {
    return {
        type: LOAD_PROFESSIONAL_SUCCESS,
        response
    };
}

export function loadFailure(error) {
    return {
        type: LOAD_PROFESSIONAL_FAILURE,
        error
    };
}

export function* watchLoadProfessional(client, { professionalId }) {
    try {
        const response = yield client.get(`/professionals/${professionalId}`);
        const comments = yield client.get(`/v1/professionals/${professionalId}/comments`);
        yield put(loadComments(comments.data));
        yield put(loadSuccess(response.data));
        yield put(END);

    } catch (error) {
        handleSagaError(error);
        yield put(loadFailure(error));
    }
}