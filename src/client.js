import React from 'react';
import Routes from './common/containers/App/App';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';
import createStore from './common/redux/create';

const store = createStore(window.__PRELOADED_STATE__);
hydrate(<Provider store={store}>
    <Routes />
</Provider>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
