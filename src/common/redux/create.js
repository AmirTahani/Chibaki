import { autoRehydrate, persistStore } from 'redux-persist';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import saga from './saga';


export default function create(client, preloadState) {
    const sagaMiddleWare = createSagaMiddleware();

    const store = createStore(
        reducers,
        preloadState,
        applyMiddleware(sagaMiddleWare),
        autoRehydrate()
    );

    persistStore(store, {
        whitelist: ['provinces']
    });

    store.rootTask = sagaMiddleWare.run(saga, client, store);

    return store;
}
