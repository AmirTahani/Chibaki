import { put, select } from 'redux-saga/effects';
import { END } from 'redux-saga';
import { handleSagaError } from '../../utils/handleSagaError';

export const LOAD_PROFICIENTS = 'ssr/proficients/LOAD_PROFICIENTS';
export const LOAD_PROFICIENTS_SUCCESS = 'ssr/proficients/LOAD_PROFICIENTS_SUCCESS';
export const LOAD_PROFICIENTS_FAILURE = 'ssr/proficients/LOAD_PROFICIENTS_FAILURE';
export const INCREASE_PAGE_NUMBER = 'ssr/proficients/INCREASE_PAGE_NUMBER';
export const PAGINATION_STATE = 'ssr/proficients/PAGINATION_STATE';
export const FETCHING = 'ssr/proficients/FETCHING';

const initialState = {
    loading: false,
    loaded: false,
    proficients: [],
    error: null,
    title: '',
    selectedProfession: {},
    pagination: 0,
    paginationEnded: false,
    fetching: false,
    count: 0,
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD_PROFICIENTS:
            return {
                ...state,
                loading: !action.more,
                title: action.title,
                selectedProfession: action.selectedProfession
            };
        case INCREASE_PAGE_NUMBER:
            return {
                ...state,
                pagination: action.number
            };
        case PAGINATION_STATE:
            return {
                ...state,
                paginationEnded: action.state
            };
        case FETCHING:
            return {
                ...state,
                fetching: action.fetch,
            };
        case LOAD_PROFICIENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                proficients: action.response,
                count: action.res.meta.total_count,
                fetching: false
            };
        case LOAD_PROFICIENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                fetching: false
            };
        default:
            return state;
    }
}

export function load(professionId, title, selectedProfession, provinceId, more, resolve, reject) {
    return {
        type: LOAD_PROFICIENTS,
        resolve,
        reject,
        professionId,
        title,
        selectedProfession,
        provinceId,
        more
    };
}

export function loadSuccess(response, res) {
    return {
        type: LOAD_PROFICIENTS_SUCCESS,
        response,
        res
    };
}

export function loadFailure(error) {
    return {
        type: LOAD_PROFICIENTS_FAILURE,
        error
    };
}

export function NextPageNumber(number) {
    return {
        type: INCREASE_PAGE_NUMBER,
        number
    };
}
export function paginationEndedState(state) {
    return {
        type: PAGINATION_STATE,
        state
    };
}

export function fetching(fetch) {
    return {
        type: FETCHING,
        fetch,
    };
}

export function* watchLoadProficients(client, { resolve, reject, professionId, more, provinceId }) {
    const isFetching = yield select(state => state.proficients.fetching);
    if (isFetching) return false;
    try {
        yield put(fetching(true));
        let CurrentPage = 0;
        if (more) {
            CurrentPage = yield select(state => state.proficients.pagination);
        }

        yield put(NextPageNumber(CurrentPage + 1));

        if (!more) {
            yield put(paginationEndedState(false));
        }
        const ended = yield select(state => state.proficients.paginationEnded);
        if (!ended) {
            const response = yield client.get(`/v1/professionals?profession=${professionId}${provinceId ? `&province=${provinceId}` : ''}&select=firstname,lastname,trust&populate=professions&sort=-trust.amount&page=${CurrentPage}`);
            const items = response.data.professionals;
            if (items.length < 10) {
                yield put(paginationEndedState(true));
            }
            if (CurrentPage === 0) {
                yield put(loadSuccess(items, response.data));
            } else if (more) {
                const oldArray = yield select(state => state.proficients.proficients);
                console.log(oldArray);
                const newArray = oldArray.concat(items);
                console.log(newArray);
                yield put(loadSuccess(newArray, response.data));
            }
        } else {
            yield put(loadFailure());
        }
        resolve && resolve();
    } catch (error) {
        reject && reject();
        handleSagaError(error);
        yield put(loadFailure(error));
    }
}
