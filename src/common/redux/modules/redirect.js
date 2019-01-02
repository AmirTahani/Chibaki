import { put, select } from 'redux-saga/effects';

export const SET_REDIRECT = 'ssr/redirect/SET_REDIRECT';
export const REDIRECT = 'ssr/redirect/REDIRECT';


const initialState = {
    to: '',
    shouldRedirect: ''
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_REDIRECT:
            return {
                ...state,
                to: action.to,
                shouldRedirect: action.shouldRedirect
            };
        default:
            return state;
    }
}

export function setRedirect({ to, shouldRedirect }) {
    return {
        type: SET_REDIRECT,
        to,
        shouldRedirect
    };
}

export function redirect(history) {
    return {
        type: REDIRECT,
        history
    };
}


export function* watchRedirect({ history }) {
    try {
        const state = yield select(s => s.redirect);
        history.push(state.to);
        yield put(setRedirect({ to: '/', shouldRedirect: false }));
    } catch (error) {
        console.log(error, 'error in redirtect');
    }
}
