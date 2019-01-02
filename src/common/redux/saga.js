import { all, takeEvery } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';

import { watchRehydrate } from './modules/rehydrate';
import {
    LOAD_PROFESSIONS_LIST,
    watchLoadProfessionsList,
    LOAD_CATEGORIES,
    watchLoadCategories,
    LOADER,
    watchLoader,
    LOAD_PROFESSIONS,
    watchLoadProfessions
} from './modules/professions';

import {
    LOAD as LOAD_SERVICE,
    watchLoad as watchLoadService
} from './modules/serviceContainer';

import {
    LOAD_QUESTIONS,
    watchLoadQuestions,
    SUBMIT_ANSWERS,
    watchSubmitAnswers
} from './modules/questions';

import {
    LOAD_PROFICIENTS,
    watchLoadProficients,
} from './modules/proficients';

import {
    LOAD_PROVINCES,
    watchLoadProvinces
} from './modules/provinces';

import {
    LOAD_PROFESSIONAL,
    watchLoadProfessional
} from './modules/professional';

import {
    LOAD as LOAD_PROJECTS_PROF,
    watchLoad as watchLoadProjectsForProfession
} from './modules/projectsForProfession';

import {
    LOGIN,
    watchLogin,
    REGISTER,
    watchRegister,
    VERIFY,
    watchVerifyMobile,
    SET_JWT,
    watchSetJwt,
    UN_SET_JWT,
    watchUnsetJwt,
    GET_USER,
    watchGetUser,
    UPDATE_USER,
    watchUpdateUser
} from './modules/auth';
import { REDIRECT, watchRedirect } from './modules/redirect';

export default function* root(client, store) {
    yield all([
        takeEvery(REHYDRATE, watchRehydrate, store),
        takeEvery(LOAD_PROFESSIONS_LIST, watchLoadProfessionsList, client),
        takeEvery(LOAD_PROFESSIONS, watchLoadProfessions, client),
        takeEvery(LOAD_CATEGORIES, watchLoadCategories, client),
        takeEvery(LOADER, watchLoader, client),
        takeEvery(LOAD_PROFICIENTS, watchLoadProficients, client),
        takeEvery(LOAD_QUESTIONS, watchLoadQuestions, client),
        takeEvery(SUBMIT_ANSWERS, watchSubmitAnswers, client),
        takeEvery(LOAD_PROVINCES, watchLoadProvinces, client),
        takeEvery(LOAD_PROFESSIONAL, watchLoadProfessional, client),
        takeEvery(LOGIN, watchLogin, client),
        takeEvery(REGISTER, watchRegister, client),
        takeEvery(VERIFY, watchVerifyMobile, client),
        takeEvery(LOAD_PROJECTS_PROF, watchLoadProjectsForProfession, client),
        takeEvery(LOAD_SERVICE, watchLoadService, client),
        takeEvery(SET_JWT, watchSetJwt, client),
        takeEvery(UN_SET_JWT, watchUnsetJwt, client),
        takeEvery(GET_USER, watchGetUser, client),
        takeEvery(UPDATE_USER, watchUpdateUser, client),
        takeEvery(REDIRECT, watchRedirect)
    ]);
}
