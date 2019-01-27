import React from 'react';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';
import Router from 'react-router-dom/Router';
import createBrowserHistory from 'history/createBrowserHistory';
import { PersistGate } from 'redux-persist/integration/react';
import Loadable from 'react-loadable';

import Routes from './common/containers/App/App';
import apiClient from './common/utils/apiClient';
import createStore from './common/redux/create';

const supportsHistory = 'pushState' in window.history;
export const history = createBrowserHistory();
console.log(process.env.MODE, 'this is mode in client');

const { store, persistor } = createStore(new apiClient(), window.__PRELOADED_STATE__, 'client');

Loadable.preloadReady().then(() => {
    hydrate(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router history={history} forceRefresh={!supportsHistory}>
                    <Routes />
                </Router>
            </PersistGate>
        </Provider>, document.getElementById('root')
    );
});


if (module.hot) {
    module.hot.accept();
}
