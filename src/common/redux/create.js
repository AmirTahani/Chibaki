import { persistStore, persistReducer } from 'redux-persist';
import { lazy } from 'react';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import saga from './saga';

export default function create(client, preloadState, type) {
    const sagaMiddleWare = createSagaMiddleware();
    let finalReducers;
    if (type === 'server') {
        finalReducers = reducers;
    } else {
        const config = {
            key: 'primary',
            storage: lazy(() => import('redux-persist/lib/storage')),
            whitelist: [
                'auth', 'provinces', 'professions'
            ],
        };
        finalReducers = persistReducer(config, reducers);
    }
    const store = createStore(finalReducers, preloadState, applyMiddleware(sagaMiddleWare));
    store.rootTask = sagaMiddleWare.run(saga, client, store);
    if (type !== 'server') {
        const persistor = persistStore(store);
        return { store, persistor };
    }
    return { store, persistor: null };
}
