import { Router, Route, browserHistory } from 'react-router';
import React from 'react';
import 'antd/dist/antd.less';
import '../../styles/App.styl';

import { Home, About, Services, Tos, Service, Professional, ContactUs } from '../';

const changeRenderType = (a, b) => {
    console.log(a, b, 'here');
    if (typeof window !== 'undefined') {
        console.log(window.__renderType__, ' this is it');
        window.__renderType__ = 'client';
    }
};
const Routes = (props) => {
    return (
        <Router history={browserHistory} {...props} onEnter={changeRenderType}>
            <Route path="/" component={Home} onEnter={changeRenderType} />
            <Route path="home" component={Home} onEnter={changeRenderType} />
            <Route path="about" component={About} onEnter={changeRenderType} />
            <Route path="tos" component={Tos} onEnter={changeRenderType} />
            <Route path="contactus" component={ContactUs} onEnter={changeRenderType} />
            <Route exact path={encodeURI('خدمات')} component={Services} onEnter={changeRenderType} />
            <Route path={`${encodeURI('خدمات')}/:title`} component={Service} onEnter={changeRenderType} />
            <Route path={'professional/:id'} component={Professional} onEnter={changeRenderType} />
        </Router>
    );
};

export default Routes;
