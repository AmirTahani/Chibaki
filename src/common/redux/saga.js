import { all, takeEvery } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/constants';

import { watchRehydrate } from './modules/rehydrate';
import { LOAD_PROFESSIONS_LIST, watchLoadProfessionsList } from './modules/professions';

export default function* root(client, store) {
    yield all([
        takeEvery(REHYDRATE, watchRehydrate),
        takeEvery(LOAD_PROFESSIONS_LIST, watchLoadProfessionsList, client),
    ]);
}