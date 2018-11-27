import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import HowItWorks from '../../components/Kit/HowItWorks/HowItWorks';
import Features from '../../components/Features/Features';
import GetApp from '../../components/GetApp/GetApp';
import styles from './Main.module.styl';

class Main extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        router: PropTypes.objectOf(PropTypes.any).isRequired
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
        const { router } = nextProps;
        const currentLocation = decodeURI(router.getCurrentLocation().pathname);
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
        const { router } = this.props;
        const currentLocation = decodeURI(router.getCurrentLocation().pathname);
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
                    {this.props.children}
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
