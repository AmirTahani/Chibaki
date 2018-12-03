import React from 'react';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';
import Router from 'react-router-dom/Router';
import createBrowserHistory from 'history/createBrowserHistory';

import Routes from './common/containers/App/App';
import apiClient from './common/utils/apiClient';
import createStore from './common/redux/create';
import { PersistGate } from 'redux-persist/integration/react'

const supportsHistory = 'pushState' in window.history;
export const history = createBrowserHistory();

const {store, persistor} = createStore(new apiClient(), window.__PRELOADED_STATE__);
console.log(window.__PRELOADED_STATE__)
hydrate(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <Router history={history} forceRefresh={!supportsHistory}>
            <Routes />
        </Router>
    </PersistGate>

</Provider>, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
