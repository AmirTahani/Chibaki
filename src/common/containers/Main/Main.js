import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';
import { withRouter } from 'react-router';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { hotjar } from 'react-hotjar';
import queryString from 'query-string';
import { isDev } from '../../config';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import HowItWorks from '../../components/Kit/HowItWorks/HowItWorks';
import Features from '../../components/Features/Features';
import GetApp from '../../components/GetApp/GetApp';
import styles from './Main.module.styl';

const LoadableHome = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ '../Home/Home'),
    loading: () => <Spin />,
});

const LoadableAbout = Loadable({
    loader: () => import(/* webpackChunkName: "about" */ '../About/About'),
    loading: () => <Spin />,
});

const LoadableContactUs = Loadable({
    loader: () => import(/* webpackChunkName: "contactUs" */ '../ContactUs/ContactUs'),
    loading: () => <Spin />,
});

const LoadableProfessional = Loadable({
    loader: () => import(/* webpackChunkName: "professional" */ '../Professional/Professional'),
    loading: () => <Spin />,
});

const LoadableService = Loadable({
    loader: () => import(/* webpackChunkName: "service" */ '../Service/Service'),
    loading: () => <Spin />,
});

const LoadableServices = Loadable({
    loader: () => import(/* webpackChunkName: "services" */ '../Services/Services'),
    loading: () => <Spin />,
});

const LoadableTos = Loadable({
    loader: () => import(/* webpackChunkName: "tos" */ '../Tos/Tos'),
    loading: () => <Spin />,
});

const LoadableNotFound = Loadable({
    loader: () => import(/* webpackChunkname: "notFound" */ '../404/NotFound'),
    loading: () => <Spin />
});

const LoadableLogin = Loadable({
    loader: () => import(/* webpackChunkname: "login" */ '../Login/Login'),
    loading: () => <Spin />
});

const LoadableVerify = Loadable({
    loader: () => import(/* webpackChunkname: "verify" */ '../Verify/Verify'),
    loading: () => <Spin />
});

const LoadableRegister = Loadable({
    loader: () => import(/* webpackChunkname: "register" */ '../Register/Register'),
    loading: () => <Spin />
});

class Main extends Component {
    static propTypes = {
        location: PropTypes.objectOf(PropTypes.any).isRequired,
        history: PropTypes.objectOf(PropTypes.any).isRequired
    };

    state = {
        shouldShowChibakiSection: true,
        visible: {
            howItWorks: true,
            features: true,
            getApp: true
        },
        isAuth: false
    };

    handleScroll = (type) => {
        ReactDom.findDOMNode(this.refs[type]).scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
        });
    };

    componentWillReceiveProps(nextProps) {
        const { location } = nextProps;
        const currentLocation = decodeURI(location.pathname);
        if (currentLocation === '/درباره_ما' || currentLocation === '/تماس_با_ما') {
            this.setState({
                shouldShowChibakiSection: false
            });
        } else {
            this.setState({
                shouldShowChibakiSection: true
            });
        }
    }

    onRouteChange = (location) => {
        const pathname = decodeURI(location.pathname);
        /**
         * Hide crisp chat on service page
         */
        const shouldShowCrisp = !/خدمات\//g.test(pathname);
        document.querySelector('html').classList.toggle('hide-crisp', !shouldShowCrisp);

        /**
         * Hide everything in auth state
         */
        const isAuth = /(login|register|verify)/g.test(pathname);
        this.setState({
            isAuth
        });
    }

    componentDidMount() {
        window.__renderType__ = 'client';

        const { history } = this.props;
        history.listen((location) => {
            if (window) {
                if (!isDev) {
                    gtag && gtag('config', 'UA-99324713-1', {
                        page_path: `/${location.pathname}${location.search}`
                    });
                    hotjar.initialize(734640);
                }

                window.__renderType__ = 'client';
                const params = queryString.parse(location.search);
                if (!this.exist(params, 'cat')) {
                    window.scrollTo(0, 0);
                }

                this.onRouteChange(location);
            }
        });

        const currentLocation = decodeURI(location.pathname);
        if (currentLocation === '/درباره_ما' || currentLocation === '/تماس_با_ما') {
            this.setState({
                shouldShowChibakiSection: false
            });
        }

        this.onRouteChange(location);
    }

    render() {
        const { isAuth, shouldShowChibakiSection } = this.state;
        return (
            <div>
                { !isAuth &&
                    <Header handleScroll={this.handleScroll} />
                }

                <div className={styles.container}>
                    <Switch>
                        <Route exact path="/" component={LoadableHome} />
                        <Route path="/درباره_ما/" component={LoadableAbout} />
                        <Route path="/tos/" component={LoadableTos} />
                        <Route path="/تماس_با_ما/" component={LoadableContactUs} />
                        <Route exact path="/خدمات" component={LoadableServices} />
                        <Route path="/خدمات/:title" component={LoadableService} />
                        <Route path="/professional/:id/" component={LoadableProfessional} />
                        <Route path="/login" component={LoadableLogin} />
                        <Route path="/verify" component={LoadableVerify} />
                        <Route path="/register" component={LoadableRegister} />
                        <Route component={LoadableNotFound} />
                        <Route path="/notFound" component={LoadableNotFound} />
                    </Switch>
                </div>

                { !isAuth && <HowItWorks
                    ref="howitworks"
                    shouldShowChibakiSection={shouldShowChibakiSection}
                /> }

                { !isAuth && <Features
                    ref="features"
                    shouldShowChibakiSection={shouldShowChibakiSection}
                /> }

                { !isAuth &&
                    <GetApp />
                }

                { !isAuth &&
                    <Footer />
                }
            </div>
        );
    }
}

export default withRouter(Main);
