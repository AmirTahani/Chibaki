import { put } from 'redux-saga/effects';
import { setJwt } from './auth';

export function* watchRehydrate(store) {
    const state = yield store.getState();
    if (state.auth.jwt && state.auth.user && state.auth.user._id) {
        localStorage.setItem('ngStorage-userToken', JSON.stringify(state.auth.jwt));
        yield put(setJwt(state.auth.jwt));
    }
}
