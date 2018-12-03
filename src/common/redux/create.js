import { persistStore, persistReducer } from 'redux-persist'
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import saga from './saga';
import storage from "redux-persist/lib/storage";

const config = {
    key: 'primary',
    storage,
    whitelist: [
        'auth', 'provinces', 'professions'
    ],
};
export default function create(client, preloadState) {
    const sagaMiddleWare = createSagaMiddleware();
    const persistedReducer = persistReducer(config, reducers);

    let store = createStore(persistedReducer, preloadState, applyMiddleware(sagaMiddleWare));
    store.rootTask = sagaMiddleWare.run(saga, client, store);

    let persistor = persistStore(store);
    return { store, persistor }
}
