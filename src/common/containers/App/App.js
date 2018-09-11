import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import createStore from '../../redux/create';

import { Home, About } from '../';

const store = createStore();

const Routes = props => {
    return (
        <Provider store={store}>
            <Router history={browserHistory} {...props}>
                <Route path="/" component={Home}/>
                <Route path="home" component={Home}/>
                <Route path="about" component={About}/>
            </Router>
        </Provider>
    );
};

export default Routes;
