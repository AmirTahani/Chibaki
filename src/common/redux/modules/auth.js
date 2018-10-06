import { put } from 'redux-saga/effects';
import { handleSagaError } from '../../utils/handleSagaError';


export const LOGIN = 'ssr/auth/LOGIN';
export const LOGIN_SUCCESS = 'ssr/auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'ssr/auth/LOGIN_FAILURE';

export const VERIFY = 'ssr/auth/VERIFY';
export const VERIFY_SUCCESS = 'ssr/auth/VERIFY_SUCCESS';
export const VERIFY_FAILURE = 'ssr/auth/VERIFY_FAILURE';

export const REGISTER = 'ssr/auth/REGISTER';
export const REGISTER_SUCCESS = 'ssr/auth/REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'ssr/auth/REGISTER_FAILURE';

export const SET_USER_MOBILE = 'ssr/auth/SET_USER_MOBILE';

const initialState = {
    user: {},
    loggingIn: false,
    loggedIn: false,
    loginError: null,
    verifying: false,
    verified: false,
    mobile: '',
    verifyError: null,
    registering: false,
    registered: false,
    registerError: null
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggingIn: true,
                mobile: action.mobile
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                loginError: action.error
            };
        case VERIFY:
            return {
                ...state,
                verifying: true
            };
        case VERIFY_SUCCESS:
            return {
                ...state,
                verified: true,
                verifying: false
            };
        case VERIFY_FAILURE:
            return {
                ...state,
                verifyError: action.error,
                verifying: false
            };
        case REGISTER:
            return {
                ...state,
                registering: true,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                registering: false,
                registered: true
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                registering: false,
                registerError: action.error
            };
        case SET_USER_MOBILE:
            return {
                ...state,
                mobile: action.mobile
            };
        default:
            return state;
    }
}

export function login(mobile, resolve, reject) {
    return {
        type: LOGIN,
        mobile,
        resolve,
        reject
    };
}

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    };
}

export function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        error
    };
}

export function verify(code) {
    return {
        type: VERIFY,
        code
    };
}

export function verifySuccess(user) {
    return {
        type: VERIFY_SUCCESS,
        user
    };
}

export function verifyFailure(error) {
    return {
        type: VERIFY_FAILURE,
        error
    };
}

export function register({ firstName, lastName, mobile }) {
    return {
        type: REGISTER,
        firstName,
        lastName,
        mobile
    };
}

export function registerSuccess() {
    return {
        type: REGISTER_SUCCESS
    };
}

export function registerFailure(error) {
    return {
        type: REGISTER_FAILURE,
        error
    };
}

export function setUserMobile(mobile) {
    return {
        type: SET_USER_MOBILE,
        mobile
    };
}


export function* watchLogin(client, { mobile, resolve, reject }) {
    try {
        const options = {
            data: { username: mobile },
        };
        yield client.post('/login', options);
        resolve && resolve();
    } catch (error) {
        yield handleSagaError(error);
        yield put(loginFailure(error));
        reject && reject();
    }
}

export function* watchRegister(client, { data }) {
    try {
        const response = yield client.post('/signup', { data });
        yield put(registerSuccess(response));
    } catch (error) {
        if (error.status === 409) {
            console.log('its here');
            // Toast.showWithGravity('شما قبلا ثبت نام کردید.', Toast.LONG, Toast.TOP);
        } else {
            // Toast.showWithGravity('متاسفانه با مشکل مواجه شد.', Toast.LONG, Toast.TOP);
        }
        yield put(registerFailure(error));
    }
}

export function* watchVerifyMobile(client, store, { data }) {
    try {
        const response = yield client.post('/verify-mobile', { data });
        yield put(verifySuccess(response));

    } catch (error) {
        yield handleSagaError(error);
    }
}

