import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import 'antd/dist/antd.less';
import { exist } from '../../utils/helpers';
import '../../styles/App.styl';

import { Home, About, Services, Tos, Service, Professional, ContactUs, Main } from '../';

Component.prototype.exist = exist;
Component.prototype.event = (props) => {
    if (window && window.__renderType__ === 'client' && window && !window.__DEV__) {
        ReactGA.event(...props);
    }
};
ReactGA.initialize('UA-99324713-1');

const Routes = (props) => {
    if (browserHistory && browserHistory.listen) {
        browserHistory.listen((location) => {
            if (window) {
                ReactGA.pageview(location.pathname + location.search);
                window.__renderType__ = 'client';
            }
        });
    }

    return (
        <Router history={browserHistory} {...props}>
            <Route path="/" component={Main}>
                <IndexRoute component={Home} />
                <Route path="about" component={About} />
                <Route path="tos" component={Tos} />
                <Route path="contactus" component={ContactUs} />
                <Route exact path={encodeURI('خدمات')} component={Services} />
                <Route path={`${encodeURI('خدمات')}/:title`} component={Service} />
                <Route path={'professional/:id'} component={Professional} />
            </Route>
        </Router>
    );
};

export default Routes;
