import React from 'react';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';
import Routes from './common/containers/App/App';
import apiClient from './common/utils/apiClient';
import createStore from './common/redux/create';

const store = createStore(new apiClient(), window.__PRELOADED_STATE__);
hydrate(<Provider store={store}>
    <Routes />
</Provider>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
