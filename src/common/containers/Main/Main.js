import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import HowItWorks from '../../components/Kit/HowItWorks/HowItWorks';
import Features from '../../components/Features/Features';
import GetApp from '../../components/GetApp/GetApp';
import styles from './Main.module.styl';

export default class Main extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    render() {
        return (
            <div>
                <Header />
                <div className={styles.container}>
                    {this.props.children}
                </div>
                <HowItWorks />

                <Features />

                <GetApp />

                <Footer />
            </div>
        );
    }
}