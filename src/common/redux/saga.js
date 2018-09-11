import { all, takeEvery } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/constants';

import { watchRehydrate } from './modules/rehydrate';
import { A, watchChangeName } from './modules/test';

export default function* root() {
    yield all([
        takeEvery(REHYDRATE, watchRehydrate),
        takeEvery(A, watchChangeName)
    ]);
}