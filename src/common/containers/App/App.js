import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { browserHistory, withRouter } from 'react-router';

import React, { Component } from 'react';
import 'antd/dist/antd.less';
import { exist } from '../../utils/helpers';
import '../../styles/App.styl';
import { About, ContactUs, Home, Professional, Service, Services, Tos, Main } from '../';
import { hotjar } from "react-hotjar";

Component.prototype.exist = exist;
Component.prototype.event = (props) => {
    if (window && window.__renderType__ === 'client' && window && !window.__DEV__) {
        window.ga('send', 'event', props.category, props.action, props.label, props.value);
    }
};


class Routes extends Component {
//     if (browserHistory && browserHistory.listen) {
// });
    render() {
        return (
            <section>
                <Switch onUpdate={() => window.scrollTo(0, 0)} >
                    <Route  path="/" component={Main} />
                </Switch>
            </section>
        );
    };
}
function mapStateToProps(state) {
    return {

    }
}
export default withRouter(connect(mapStateToProps)(Routes));

