import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import { Home, About, Services } from '../';


const Routes = props => {
    return (
        <Router history={browserHistory} {...props}>
            <Route path="/" component={Home} />
            <Route path="home" component={Home} />
            <Route path="about" component={About} />
            <Route path={encodeURI('خدمات')} component={Services} >
                <Route path=":title" component={About}/>
            </Route>

        </Router>
    );
};

export default Routes;
