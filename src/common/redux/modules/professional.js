import { put } from 'redux-saga/effects';
import { END } from 'redux-saga';
import { handleSagaError } from '../../utils/handleSagaError';

export const LOAD_PROFESSIONAL = 'ssr/professional/LOAD_PROFESSIONAL';
export const LOAD_PROFESSIONAL_SUCCESS = 'ssr/professional/LOAD_PROFESSIONAL_SUCCESS';
export const LOAD_PROFESSIONAL_FAILURE = 'ssr/professional/LOAD_PROFESSIONAL_FAILURE';

const initialState = {
    loading: false,
    loaded: false,
    professional: [],
    error: null,
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD_PROFESSIONAL:
            return {
                ...state,
                loading: true,
            };
        case LOAD_PROFESSIONAL_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                professional: action.response.results,
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
        console.log(professionalId)
        const response = yield client.get(`/professionals/${professionalId}`);
        yield put(loadSuccess(response.data));
        console.log(response.data);
        yield put(END);

    } catch (error) {
        handleSagaError(error);
        yield put(loadFailure(error));
    }
}