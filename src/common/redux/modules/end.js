import { put } from 'redux-saga/effects';

export const END = 'ssr/end/END';
export const END_SUCCESS = 'ssr/end/END_SUCCESS';
export const END_FAILURE = 'ssr/end/END_FAILURE';


const initialState = {
    isEnded: false,
    error: null
};
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case END_SUCCESS:
            return {
                ...state,
                isEnded: action.isEnded
            };
        case END_FAILURE:
            return {
                ...state,
                isEnded: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function end() {
    return {
        type: END
    };
}

export function endSuccess(isEnded) {
    return {
        type: END_SUCCESS,
        isEnded
    };
}

export function endFailure() {
    return {
        type: END_FAILURE
    };
}


export function* watchEnd() {
    try {
        yield put(endSuccess(true));
    } catch (error) {
        yield put(endFailure(error));
    }
}
