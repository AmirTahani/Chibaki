import { autoRehydrate, persistStore } from 'redux-persist';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import saga from './saga';


export default function create() {
    const sagaMiddleWare = createSagaMiddleware();

    const store = createStore(
        reducers,
        applyMiddleware(sagaMiddleWare),
        autoRehydrate()
    );


    persistStore(store, {
        whitelist: []
    });

    store.rootTask = sagaMiddleWare.run(saga);

    return store;
}
