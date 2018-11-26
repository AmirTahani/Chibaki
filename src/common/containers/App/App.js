import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React, { Component } from 'react';
import { hotjar } from 'react-hotjar';
import 'antd/dist/antd.less';
import { exist } from '../../utils/helpers';
import '../../styles/App.styl';

import { Home, About, Services, Tos, Service, Professional, ContactUs, Main } from '../';

Component.prototype.exist = exist;
Component.prototype.event = (props) => {
    if (window && window.__renderType__ === 'client' && window && !window.__DEV__) {
        window.ga('send', 'event', props.category, props.action, props.label, props.value);
    }
};


const Routes = (props) => {
    if (browserHistory && browserHistory.listen) {
        browserHistory.listen((location) => {
            if (window) {
                console.log(`/${location.pathname}${location.search}`, 'this isit');
                ga('send', 'pageview', `/${location.pathname}${location.search}`);
                window.__renderType__ = 'client';
                hotjar.initialize(734640);
            }
        });
    }

    return (
        <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} {...props}>
            <Route path="/" component={Main}>
                <IndexRoute component={Home} />
                <Route path={encodeURI('درباره_ما')} component={About} />
                <Route path="tos" component={Tos} />
                <Route path={encodeURI('تماس_با_ما')} component={ContactUs} />
                <Route exact path={encodeURI('خدمات')} component={Services} />
                <Route path={`${encodeURI('خدمات')}/:title`} component={Service} />
                <Route path={'professional/:id'} component={Professional} />
            </Route>
        </Router>
    );
};

export default Routes;
