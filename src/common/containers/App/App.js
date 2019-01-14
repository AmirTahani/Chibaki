import { browserHistory, withRouter } from 'react-router';
import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { hotjar } from 'react-hotjar';
import Main from '../Main/Main';
import { exist } from '../../utils/helpers';
import { isDev } from '../../config';
import '../../styles/App.styl';

if (typeof window !== 'undefined') {
    require('intersection-observer');
}

Component.prototype.exist = exist;
Component.prototype.event = (props) => {
    console.log('process.env.IS_DEV: ', process.env.IS_DEV);
    console.log('window.__renderType__: ', window.__renderType__);
    console.log('gtag: ', gtag);
    console.log('window: ', window);
    console.log(isDev, typeof isDev);
    if (window && window.__renderType__ === 'client' && !isDev) {
        console.log('inside gtag');
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

