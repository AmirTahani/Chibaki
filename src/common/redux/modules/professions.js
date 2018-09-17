import { put, take } from 'redux-saga/effects';
import { handleSagaError } from "../../utils/handleSagaError";
import { END } from 'redux-saga';


export const LOAD_PROFESSIONS_LIST = 'ssr/professions/LOAD_PROFESSIONS_LIST';
export const LOAD_PROFESSIONS_LIST_SUCCESS = 'ssr/professions/LOAD_PROFESSIONS_LIST_SUCCESS';
export const LOAD_PROFESSIONS_LIST_FAILURE = 'ssr/professions/LOAD_PROFESSIONS_LIST_FAILURE';

export const LOAD_CATEGORIES = 'ssr/professions/LOAD_CATEGORIES';
export const LOAD_CATEGORIES_SUCCESS = 'ssr/professions/LOAD_CATEGORIES_SUCCESS';
export const LOAD_CATEGORIES_FAILURE = 'ssr/professions/LOAD_CATEGORIES_FAILURE';

export const LOADER = 'ssr/professions/LOADER';

const initialState = {
    loading: false,
    loaded: false,
    professionsList: [],
    error: null,
    categories: [],
    loadingCategories: false,
    loadedCategories: false,
    errorCategories: null
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD_PROFESSIONS_LIST:
            return {
                ...state,
                loading: true
            };
        case LOAD_PROFESSIONS_LIST_SUCCESS:
            console.log(action, 'this is action');
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
        case LOAD_CATEGORIES:
            return {
                ...state,
                loadingCategories: true
            };
        case LOAD_CATEGORIES_SUCCESS:
            return {
                ...state,
                loadingCategories: false,
                loadedCategories: true,
                categories: action.categories
            };
        case LOAD_CATEGORIES_FAILURE:
            return {
                ...state,
                loadingCategories: false,
                errorCategories: action.error
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

export function loadCategories() {
    return {
        type: LOAD_CATEGORIES
    };
}

export function loadCategoriesSuccess(categories) {
    return {
        type: LOAD_CATEGORIES_SUCCESS,
        categories
    };
}

export function loadCategoriesFailure(error) {
    return {
        type: LOAD_CATEGORIES_FAILURE,
        error
    };
}

export function loader() {
    return {
        type: LOADER
    };
}

export function* watchLoadProfessionsList(client) {
    try {
        const response = yield client.get('/professions/lists');
        yield put(loadProfessionsListSuccess(response.data.professions));
    } catch (error) {
        yield put(loadProfessionsListFailure(error));
        handleSagaError(error);
    }
}

export function* watchLoadCategories(client) {
    try {
        const response = yield client.get('/signup');
        yield put(loadCategoriesSuccess(response.data.categorires));
    } catch (error) {
        console.log('this is error,', error);
        yield put(loadCategoriesFailure(error));
    }
}

export function* watchLoader() {
    try {
        yield put(loadCategories());
        yield take(LOAD_CATEGORIES_SUCCESS);
        yield put(loadProfessionsList());
        yield take(LOAD_PROFESSIONS_LIST_SUCCESS);
        yield put(END);
    } catch (error) {
        console.log(error, 'this is fucking error');
    }
}