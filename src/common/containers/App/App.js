import { browserHistory, withRouter } from 'react-router';
import { hot } from 'react-hot-loader/root';
import * as Sentry from '@sentry/browser';
import React, { Component } from 'react';
import { hotjar } from 'react-hotjar';
import Main from '../Main/Main';
import { exist } from '../../utils/helpers';
import { isDev } from '../../config';
import '../../styles/App.styl';

if (typeof window !== 'undefined') {
    require('intersection-observer');
}

if (!isDev) {
    Sentry.init({
        dsn: 'https://b8716b7a4f6c441abf643cee99875d17@sentry.io/1375725'
    });
}

Component.prototype.exist = exist;
Component.prototype.componentDidCatch = (error, errorInfo) => {
    Sentry.withScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
            scope.setExtra(key, errorInfo[key]);
        });
        if (!isDev) {
            Sentry.captureException(error);
        }
    });
};
Component.prototype.event = (props) => {
    if (window && window.__renderType__ === 'client' && !isDev) {
        gtag('event', props.action, {
            event_category: props.category,
            event_label: props.label,
            value: props.value
        });
    }
};


class Routes extends Component {
    componentDidMount() {
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = '91b68043-6b64-41c6-9b7c-a055b3dec356';
        const d = document;
        const s = d.createElement('script');
        d.getElementById('loader').style.display = 'none';
        s.src = 'https://client.crisp.chat/l.js';
        s.async = 1;
        d.getElementsByTagName('head')[0].appendChild(s);
        hotjar.initialize('734640');
    }

    render() {
        return (
            <section>
                <Main />
            </section>
        );
    }
}

export default hot(withRouter(Routes));

