import { all, takeEvery } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/constants';

import { watchRehydrate } from './modules/rehydrate';

export default function* root() {
    yield all([
        takeEvery(REHYDRATE, watchRehydrate)
    ]);
}