import { put, take, all } from 'redux-saga/effects';
import { handleSagaError } from '../../utils/handleSagaError';


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
    flattenProfessionsByCategories: [],
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
            return {
                ...state,
                loading: false,
                loaded: true,
                professionsList: action.professionsList,
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
                categories: action.categories,
                flattenProfessionsByCategories: action.flattenProfessionsByCategories
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

export function loadCategories(resolve, reject) {
    return {
        type: LOAD_CATEGORIES,
        resolve,
        reject
    };
}

export function loadCategoriesSuccess(categories, flattenProfessionsByCategories) {
    return {
        type: LOAD_CATEGORIES_SUCCESS,
        categories,
        flattenProfessionsByCategories
    };
}

export function loadCategoriesFailure(error) {
    return {
        type: LOAD_CATEGORIES_FAILURE,
        error
    };
}

export function loader(resolve, reject) {
    return {
        type: LOADER,
        resolve,
        reject
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

export function* watchLoadCategories(client, { resolve, reject }) {
    try {
        const response = yield client.get('/v1/categories?populate=professions');
        const result = response.data.categories;
        const flattenProfessionsByCategories = result.reduce((acc, current) => {
            acc.push(...current.professions);
            return acc;
        }, []);
        yield put(loadCategoriesSuccess(result, flattenProfessionsByCategories));
        resolve && resolve(response.data.categories);
    } catch (error) {
        console.log('this is error,', error);
        yield put(loadCategoriesFailure(error));
        reject && reject();
    }
}

export function* watchLoader(client, { resolve, reject }) {
    try {
        yield put(loadCategories());
        yield put(loadProfessionsList());
        yield all([
            take(LOAD_PROFESSIONS_LIST_SUCCESS),
            take(LOAD_CATEGORIES_SUCCESS)
        ]);
        resolve && resolve();
    } catch (error) {
        reject && reject();
        console.log(error, 'this is fucking error');
    }
}
