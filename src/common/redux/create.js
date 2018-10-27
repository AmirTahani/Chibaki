import { autoRehydrate, persistStore } from 'redux-persist';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import saga from './saga';


export default function create(client, preloadState) {
    const sagaMiddleWare = createSagaMiddleware();
    if (typeof window === 'object') {
        const presistedAuth = JSON.parse(localStorage.getItem('reduxPersist:auth'));
        const presistedProvinces = JSON.parse(localStorage.getItem('reduxPersist:provinces'));
        preloadState.auth = presistedAuth;
        preloadState.provinces = presistedProvinces;
    }

    const store = createStore(
        reducers,
        preloadState,
        applyMiddleware(sagaMiddleWare),
        autoRehydrate()
    );

    if (typeof window === 'object') {
        persistStore(store, {
            whitelist: ['provinces', 'auth']
        });
    }

    store.rootTask = sagaMiddleWare.run(saga, client, store);

    return store;
}
