import { Switch, Route, } from 'react-router-dom';
import { browserHistory, withRouter } from 'react-router';
import Loadable from 'react-loadable';
import { Spin } from 'antd';
import React, { Component } from 'react';
import { hotjar } from 'react-hotjar';
import { exist } from '../../utils/helpers';
import '../../styles/App.styl';

Component.prototype.exist = exist;
Component.prototype.event = (props) => {
    if (window && window.__renderType__ === 'client' && window && !window.__DEV__) {
        window.ga('send', 'event', props.category, props.action, props.label, props.value);
    }
};

const LoadableMain = Loadable({
    loader: () => import('../Main/Main'),
    loading: () => <Spin />,
});


class Routes extends Component {
    componentDidMount() {
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = '91b68043-6b64-41c6-9b7c-a055b3dec356';
        const d = document;
        const s = d.createElement('script');
        s.src = 'https://client.crisp.chat/l.js';
        s.async = 1;
        d.getElementsByTagName('head')[0].appendChild(s);
    }

    render() {
        return (
            <section>
                <Switch onUpdate={() => window.scrollTo(0, 0)}>
                    <Route path="/" component={LoadableMain} />
                </Switch>
            </section>
        );
    }
}

export default withRouter(Routes);

