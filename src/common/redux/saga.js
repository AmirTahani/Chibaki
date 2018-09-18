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

import { LOAD_PROFICIENTS, watchLoadProficients } from './modules/proficients';

export default function* root(client, store) {
    yield all([
        takeEvery(REHYDRATE, watchRehydrate),
        takeEvery(LOAD_PROFESSIONS_LIST, watchLoadProfessionsList, client),
        takeEvery(LOAD_CATEGORIES, watchLoadCategories, client),
        takeEvery(LOADER, watchLoader, client),
        takeEvery(LOAD_PROFICIENTS, watchLoadProficients, client)
    ]);
}