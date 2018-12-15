import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';
import { withRouter } from 'react-router';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { hotjar } from 'react-hotjar';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import HowItWorks from '../../components/Kit/HowItWorks/HowItWorks';
import Features from '../../components/Features/Features';
import GetApp from '../../components/GetApp/GetApp';
import styles from './Main.module.styl';

const LoadableHome = Loadable({
    loader: () => import('../Home/Home'),
    loading: () => <Spin />,
});

const LoadableAbout = Loadable({
    loader: () => import('../About/About'),
    loading: () => <Spin />,
});

const LoadableContactUs = Loadable({
    loader: () => import('../ContactUs/ContactUs'),
    loading: () => <Spin />,
});

const LoadableProfessional = Loadable({
    loader: () => import('../Professional/Professional'),
    loading: () => <Spin />,
});

const LoadableService = Loadable({
    loader: () => import('../Service/Service'),
    loading: () => <Spin />,
});

const LoadableServices = Loadable({
    loader: () => import('../Services/Services'),
    loading: () => <Spin />,
});

const LoadableTos = Loadable({
    loader: () => import('../Tos/Tos'),
    loading: () => <Spin />,
});

class Main extends Component {
    static propTypes = {
        location: PropTypes.objectOf(PropTypes.any).isRequired,
        history: PropTypes.objectOf(PropTypes.any).isRequired
    };

    state = {
        shouldShowChibakiSection: true
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

    componentDidMount() {
        const { history } = this.props;
        history.listen((location) => {
            console.log(location, 'this is location');
            if (window) {
                window.ga('send', 'pageview', `/${location.pathname}${location.search}`);
                window.__renderType__ = 'client';
                hotjar.initialize(734640);
            }
        });

        const currentLocation = decodeURI(location.pathname);
        if (currentLocation === '/درباره_ما' || currentLocation === '/تماس_با_ما') {
            this.setState({
                shouldShowChibakiSection: false
            });
        }
    }

    render() {
        const { shouldShowChibakiSection } = this.state;
        // const LoadableComponent = Loadable({
        //     loader: () => import('./my-component'),
        //     loading: Loading,
        // });
        return (
            <div>
                <Header handleScroll={this.handleScroll} />

                <div className={styles.container}>
                    <Switch>
                        <Route exact path="/" component={LoadableHome} />
                        <Route path="/درباره_ما/" component={LoadableAbout} />
                        <Route path="/tos/" component={LoadableTos} />
                        <Route path="/تماس_با_ما/" component={LoadableContactUs} />
                        <Route exact path="/خدمات" component={LoadableServices} />
                        <Route path="/خدمات/:title" component={LoadableService} />
                        <Route path="/professional/:id/" component={LoadableProfessional} />
                    </Switch>
                </div>

                <HowItWorks ref="howitworks" shouldShowChibakiSection={shouldShowChibakiSection} />

                <Features ref="features" shouldShowChibakiSection={shouldShowChibakiSection} />

                <GetApp />

                <Footer />
            </div>
        );
    }
}

export default withRouter(Main);
