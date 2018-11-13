import { put } from 'redux-saga/effects';
import { handleSagaError } from '../../utils/handleSagaError';
import { exist } from '../../utils/helpers';

export const LOAD_PROFESSIONAL = 'ssr/professional/LOAD_PROFESSIONAL';
export const LOAD_PROFESSIONAL_SUCCESS = 'ssr/professional/LOAD_PROFESSIONAL_SUCCESS';
export const LOADED_COMMENTS = 'ssr/professional/LOADED_COMMENTS';
export const LOAD_PROFESSIONAL_FAILURE = 'ssr/professional/LOAD_PROFESSIONAL_FAILURE';
export const CLEAR = 'ssr/professional/CLEAR';
export const SET_META = 'ssr/professional/SET_META';

const initialState = {
    loading: false,
    loaded: false,
    professional: {},
    error: null,
    comments: {},
    metaDescription: ''
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
        case CLEAR:
            return {
                ...state,
                professional: [],
                comments: {}
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
        case SET_META:
            return {
                ...state,
                metaDescription: action.description
            };
        default:
            return state;
    }
}

export function load(professionalId, profId, resolve, reject) {
    return {
        type: LOAD_PROFESSIONAL,
        professionalId,
        profId,
        resolve,
        reject
    };
}

export function loadComments(comments) {
    return {
        type: LOADED_COMMENTS,
        comments
    };
}

export function loadSuccess(response) {
    return {
        type: LOAD_PROFESSIONAL_SUCCESS,
        response
    };
}

export function clear() {
    return {
        type: CLEAR
    };
}

export function setMeta(description) {
    return {
        type: SET_META,
        description
    };
}

export function loadFailure(error) {
    return {
        type: LOAD_PROFESSIONAL_FAILURE,
        error
    };
}

export function* watchLoadProfessional(client, { professionalId, profId, resolve, reject }) {
    try {
        yield put(clear());
        const response = yield client.get(`/professionals/${professionalId}`);
        const comments = yield client.get(`/v1/professionals/${professionalId}/comments?populate=customer,userProfession.profession`);
        yield put(loadComments(comments.data));
        yield put(loadSuccess(response.data));
        const professions = exist(response, 'data.user.professions');
        const userProfession = professions.find(profession => profession.profession._id === profId);
        if (exist(userProfession, 'intro.description')) {
            yield put(setMeta(exist(userProfession, 'intro.description')));
        } else {
            const singleProf = yield client.get(`/v1/professions/${profId}?select=description`);
            yield put(setMeta(exist(singleProf, 'data.description')));
        }
        resolve && resolve('');
    } catch (error) {
        console.log('error ', error);
        reject && reject();
        handleSagaError(error);
        yield put(loadFailure(error));
    }
}
