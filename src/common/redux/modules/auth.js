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
export const SET_USER_CODE = 'ssr/auth/SET_USER_CODE';
export const SET_USER_NAME = 'ssr/auth/SET_USER_NAME';
export const SET_USER_LAST_NAME = 'ssr/auth/SET_USER_LAST_NAME';

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
    registerError: null,
    code: '',
    firstName: '',
    lastName: ''
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
        case SET_USER_CODE:
            return {
                ...state,
                code: action.code
            };
        case SET_USER_NAME:
            console.log(action, 'this is fuckiong action ');
            return {
                ...state,
                firstName: action.name
            };
        case SET_USER_LAST_NAME:
            console.log(action, 'this is fuckong acitomn');
            return {
                ...state,
                lastName: action.name
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

export function verify(code, resolve, reject) {
    return {
        type: VERIFY,
        code,
        resolve,
        reject
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

export function register({ firstName, lastName, mobile }, resolve, reject) {
    return {
        type: REGISTER,
        firstName,
        lastName,
        mobile,
        resolve,
        reject
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

export function setUserCode(code) {
    return {
        type: SET_USER_MOBILE,
        code
    };
}

export function setUserName(name) {
    console.log('set user nmae', name);
    return {
        type: SET_USER_NAME,
        name
    };
}

export function setUserLastName(name) {
    console.log('set lastname', name);
    return {
        type: SET_USER_LAST_NAME,
        name
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
        reject(error);
        yield handleSagaError(error);
        yield put(loginFailure(error));
    }
}

export function* watchRegister(client, { firstName, lastName, mobile, resolve, reject }) {
    try {
        const data = {
            firstname: firstName,
            lastname: lastName,
            username: mobile,
            mobile
        };
        const response = yield client.post('/signup', { data });
        yield put(registerSuccess(response.data));
        console.log(response, ' this is response');
        resolve && resolve();
    } catch (error) {
        console.log(error, 'this is error');
        yield put(registerFailure(error));
        handleSagaError(error);
        reject && reject(error);
    }
}

export function* watchVerifyMobile(client, { code, resolve, reject }) {
    try {
        const response = yield client.post('/verify-mobile', { code });
        yield put(verifySuccess(response));
        resolve && resolve();
    } catch (error) {
        yield handleSagaError(error);
        reject && reject(error);
    }
}

