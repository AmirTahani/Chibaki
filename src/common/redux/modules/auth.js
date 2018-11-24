import { put, select, take } from 'redux-saga/effects';
import ReactGA from 'react-ga';
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
export const SET_USER_GENDER = 'ssr/auth/SET_USER_GENDER';

export const CLEAR_STATE = 'ssr/auth/CLEAR_STATE';

export const TOGGLE_AUTH_MODAL = 'ssr/auth/TOGGLE_AUTH_MODAL';

export const SET_JWT = 'ssr/auth/SET_JWT';
export const SET_JWT_SUCCESS = 'ssr/auth/SET_JWT_SUCCESS';
export const UN_SET_JWT = 'ssr/auth/UN_SET_JWT';

export const GET_USER = 'ssr/auth/GET_USER';
export const GET_USER_SUCCESS = 'ssr/auth/GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'ssr/auth/GET_USER_FAILURE';

export const UPDATE_USER = 'ssr/auth/UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'ssr/auth/UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'ssr/auth/UPDATE_USER_FAILURE';

const initialState = {
    user: {},
    updateUserLoading: false,
    updateUserLoaded: false,
    getUserLoading: false,
    getUserLoaded: false,
    loggingIn: false,
    loggedIn: false,
    loginError: null,
    verifying: false,
    verified: false,
    jwt: null,
    mobile: '',
    verifyError: null,
    registering: false,
    registered: false,
    registerError: null,
    code: '',
    firstName: '',
    lastName: '',
    showAuthModal: false,
    gender: '',
    userId: ''
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case TOGGLE_AUTH_MODAL:
            return {
                ...state,
                showAuthModal: !state.showAuthModal,

                registering: false,
                loggingIn: false,

                firstName: '',
                lastName: '',
                userId: '',
                code: ''
            };
        case SET_JWT:
            return {
                ...state,
                jwt: action.token
            };
        case UN_SET_JWT:
            return {
                ...state,
                jwt: null
            };
        case CLEAR_STATE:
            return {
                ...state,
                [action.stateKey]: action.stateValue
            };
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
                loggedIn: true,
                userId: action.userId
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
                verifying: false,
                user: action.user
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
                registered: true,
                userId: action.userId
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
            return {
                ...state,
                firstName: action.name
            };
        case SET_USER_LAST_NAME:
            console.log(action);
            return {
                ...state,
                lastName: action.name
            };
        case SET_USER_GENDER:
            console.log(action.gender, 'gender');
            return {
                ...state,
                gender: action.gender
            };
        case GET_USER:
            return {
                ...state,
                getUserLoading: true
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                getUserLoading: false,
                getUserLoaded: true,
                user: action.user
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                getUserLoading: false,
                getUserLoaded: true
            };
        case UPDATE_USER:
            return {
                ...state,
                getUserLoading: true,
                getUserLoaded: false
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                getUserLoading: false,
                getUserLoaded: true,
                user: action.user
            };
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                getUserLoading: false,
                getUserLoaded: true
            };
        default:
            return state;
    }
}

export function setJwt(token) {
    return {
        type: SET_JWT,
        token
    };
}

export function setJwtSuccess() {
    return {
        type: SET_JWT_SUCCESS
    };
}

export function unSetJwt() {
    return {
        type: UN_SET_JWT
    };
}

export function clearState(stateKey, stateValue) {
    return {
        type: CLEAR_STATE,
        stateValue,
        stateKey
    };
}

export function login(mobile, resolve, reject) {
    return {
        type: LOGIN,
        mobile,
        resolve,
        reject
    };
}

export function toggleAuthModal() {
    return {
        type: TOGGLE_AUTH_MODAL
    };
}

export function loginSuccess(userId) {
    return {
        type: LOGIN_SUCCESS,
        userId
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

export function verifySuccess({ user }) {
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

export function register({ firstName, lastName, mobile, professionId, gender }, resolve, reject) {
    return {
        type: REGISTER,
        firstName,
        lastName,
        mobile,
        professionId,
        gender,
        resolve,
        reject
    };
}

export function registerSuccess(userId) {
    return {
        type: REGISTER_SUCCESS,
        userId
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
        type: SET_USER_CODE,
        code
    };
}

export function setUserName(name) {
    return {
        type: SET_USER_NAME,
        name
    };
}

export function setUserLastName(name) {
    return {
        type: SET_USER_LAST_NAME,
        name
    };
}
export function setUserGender(gender) {
    console.log(gender, 'here');
    return {
        type: SET_USER_GENDER,
        gender
    };
}


export function* watchLogin(client, { mobile, resolve, reject }) {
    try {
        const options = {
            data: { username: mobile },
        };
        const response = yield client.post('/login', options);
        yield put(loginSuccess(response.data.user_id));
        resolve && resolve();
    } catch (error) {
        reject(error);
        yield handleSagaError(error);
        yield put(loginFailure(error));
    }
}

export function* watchRegister(client, { firstName, lastName, mobile, professionId, gender, resolve, reject }) {
    try {
        const data = {
            firstname: firstName,
            lastname: lastName,
            username: mobile,
            gender,
            mobile
        };
        if (professionId) {
            data.professionid = professionId;
        }
        console.log(data);
        const response = yield client.post('/signup', { data });
        ReactGA.event({
            category: 'user',
            action: 'REGISTER_SUBMITTED',
            label: 'user completed registration'
        });
        yield put(registerSuccess(response.data.user_id));
        resolve && resolve();
    } catch (error) {
        yield put(registerFailure(error));
        handleSagaError(error);
        reject && reject(error);
    }
}

export function* watchVerifyMobile(client, { code, resolve, reject }) {
    try {
        const userId = yield select(state => state.auth.userId);
        const data = {
            code,
            user_id: userId
        };
        const response = yield client.post('/verify-mobile', { data });
        ReactGA.event({
            category: 'user',
            action: 'VERIFY',
            label: 'user verified'
        });
        yield put(verifySuccess(response.data));
        yield put(setJwt(response.data.token));
        yield take(SET_JWT_SUCCESS);
        resolve && resolve(response.data);
    } catch (error) {
        yield handleSagaError(error);
        reject && reject(error);
    }
}

export function* watchSetJwt(client, { token }) {
    client.jwt = token;
    yield put(setJwtSuccess());
    localStorage.setItem('ngStorage-userToken', JSON.stringify(token));
}

export function watchUnsetJwt(client) {
    client.jwt = null;
}

export function getUser(resolve, reject) {
    return {
        type: GET_USER,
        resolve,
        reject
    };
}

export function getUserSuccess(user) {
    return {
        type: GET_USER_SUCCESS,
        user
    };
}

export function getUserFailure(error) {
    return {
        type: GET_USER_FAILURE,
        error
    };
}

export function* watchGetUser(client, { resolve, reject }) {
    try {
        const response = yield client.get('/dashboard');
        yield put(getUserSuccess(response.data));
        resolve && resolve(response.data);
    } catch (error) {
        yield put(getUserFailure(error));
        reject && reject();
    }
}

export function updateUser(data, resolve, reject) {
    return {
        type: UPDATE_USER,
        data,
        resolve,
        reject
    };
}

export function updateUserSuccess(user) {
    return {
        type: UPDATE_USER_SUCCESS,
        user
    };
}

export function updateUserFailure(error) {
    return {
        type: UPDATE_USER_FAILURE,
        error
    };
}

export function* watchUpdateUser(client, { data, resolve, reject }) {
    try {
        const response = yield client.post('/dashboard/profile', { data });
        yield put(updateUserSuccess(response.data));
        resolve && resolve(response.data);
    } catch (error) {
        yield put(updateUserFailure(error));
        reject && reject();
    }
}
