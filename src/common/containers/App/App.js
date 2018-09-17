import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import { Home, About } from '../';


const Routes = props => {
    return (
        <Router history={browserHistory} {...props}>
            <Route path="/" component={Home} />
            <Route path="home" component={Home} />
            <Route path="about" component={About} />
        </Router>
    );
};

export default Routes;
