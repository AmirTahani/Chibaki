import { persistStore, persistReducer } from 'redux-persist';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';
import saga from './saga';

const config = {
    key: 'primary',
    storage,
    whitelist: [
        'auth', 'provinces', 'professions'
    ],
};
export default function create(client, preloadState, type) {
    const sagaMiddleWare = createSagaMiddleware();
    let finalReducers;
    if (type === 'server') {
        finalReducers = reducers;
    } else {
        finalReducers = persistReducer(config, reducers);
    }
    const store = createStore(finalReducers, preloadState, applyMiddleware(sagaMiddleWare));
    store.rootTask = sagaMiddleWare.run(saga, client, store);

    const persistor = persistStore(store);
    return { store, persistor };
}
