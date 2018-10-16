import { all, takeEvery } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/constants';

import { watchRehydrate } from './modules/rehydrate';
import {
    LOAD_PROFESSIONS_LIST,
    watchLoadProfessionsList,
    LOAD_CATEGORIES,
    watchLoadCategories,
    LOADER,
    watchLoader
} from './modules/professions';

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
    watchVerifyMobile
} from './modules/auth';

export default function* root(client, store) {
    yield all([
        takeEvery(REHYDRATE, watchRehydrate),
        takeEvery(LOAD_PROFESSIONS_LIST, watchLoadProfessionsList, client),
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
        takeEvery(LOAD_PROJECTS_PROF, watchLoadProjectsForProfession, client)
    ]);
}
