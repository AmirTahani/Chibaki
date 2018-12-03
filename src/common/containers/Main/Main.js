import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import HowItWorks from '../../components/Kit/HowItWorks/HowItWorks';
import Features from '../../components/Features/Features';
import GetApp from '../../components/GetApp/GetApp';
import styles from './Main.module.styl';
import { About, ContactUs, Professional, Service, Services, Tos, Home } from "../index";
import { hotjar } from "react-hotjar";

class Main extends Component {
    static propTypes = {
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
        const { location, history } = this.props;
        history.listen((location) => {
            console.log(location);
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
        return (
            <div>
                <Header handleScroll={this.handleScroll} />

                <div className={styles.container}>
                   <Switch>
                       <Route exact path='/' component={Home} />
                       <Route path='/درباره_ما/' component={About} />
                       <Route path="/tos/" component={Tos} />
                       <Route path='/تماس_با_ما/' component={ContactUs} />
                       <Route exact path='/خدمات' component={Services} />
                       <Route path='/خدمات/:title' component={Service} />
                       <Route path='/professional/:id/' component={Professional} />
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
