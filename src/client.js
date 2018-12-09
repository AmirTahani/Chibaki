import React from 'react';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';
import Router from 'react-router-dom/Router';
import createBrowserHistory from 'history/createBrowserHistory';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './common/containers/App/App';
import apiClient from './common/utils/apiClient';
import createStore from './common/redux/create';

const supportsHistory = 'pushState' in window.history;
export const history = createBrowserHistory();

const { store, persistor } = createStore(new apiClient(), window.__PRELOADED_STATE__);

hydrate(<Provider store={store}>
    {
        persistor ?
            <PersistGate loading={null} persistor={persistor}>
                <Router history={history} forceRefresh={!supportsHistory}>
                    <Routes />
                </Router>
            </PersistGate> :
            <Router history={history} forceRefresh={!supportsHistory}>
                <Routes />
            </Router>
    }


</Provider>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
