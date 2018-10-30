import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import HowItWorks from '../../components/Kit/HowItWorks/HowItWorks';
import Features from '../../components/Features/Features';
import GetApp from '../../components/GetApp/GetApp';

export default class Main extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <HowItWorks />

                <Features />

                <GetApp />

                <Footer />
            </div>
        );
    }
}
