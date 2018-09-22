import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import {
    Home,
    About,
    Services,
    Tos
} from '../';
import "./App.css";

const Routes = props => {
    return (
        <Router history={browserHistory} {...props}>
            <Route path="/" component={Home} />
            <Route path="home" component={Home} />
            <Route path="about" component={About} />
            <Route path="tos" component={Tos} />
            <Route exact path={encodeURI('خدمات')} component={Services} />
            <Route path={`${encodeURI('خدمات')}/:title`} component={Home}/>
        </Router>
    );
};

export default Routes;
