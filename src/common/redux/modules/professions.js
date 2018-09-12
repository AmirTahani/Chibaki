import { put, take } from 'redux-saga/effects';
import { handleSagaError } from "../../utils/handleSagaError";
import { END, delay } from 'redux-saga';


export const LOAD_PROFESSIONS_LIST = 'ssr/professions/LOAD_PROFESSIONS_LIST';
export const LOAD_PROFESSIONS_LIST_SUCCESS = 'ssr/professions/LOAD_PROFESSIONS_LIST_SUCCESS';
export const LOAD_PROFESSIONS_LIST_FAILURE = 'ssr/professions/LOAD_PROFESSIONS_LIST_FAILURE';

const initialState = {
    loading: false,
    loaded: false,
    professionsList: [],
    error: null
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD_PROFESSIONS_LIST:
            return {
                ...state,
                loading: true
            };
        case LOAD_PROFESSIONS_LIST_SUCCESS:
            console.log(action,'this is action');
            return {
                ...state,
                loading: false,
                loaded: true,
                professionsList: action.professionsList
            };
        case LOAD_PROFESSIONS_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function loadProfessionsList() {
    return {
        type: LOAD_PROFESSIONS_LIST
    };
}

export function loadProfessionsListSuccess(professionsList) {
    return {
        type: LOAD_PROFESSIONS_LIST_SUCCESS,
        professionsList
    };
}

export function loadProfessionsListFailure(error) {
    return {
        type: LOAD_PROFESSIONS_LIST_FAILURE,
        error
    };
}

export function* watchLoadProfessionsList(client) {
    try {
        console.log('its watcher');
        const response = yield client.get('/professions/lists');
        yield put(loadProfessionsListSuccess(response.data.professions));
        yield delay(5000);
        yield put(END);
    } catch (error) {
        yield put(loadProfessionsListFailure(error));
        handleSagaError(error);
    }
}