import React, { Component } from 'react';
import ReactDom from 'react-dom';
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

    handleScroll = (type) => {
        ReactDom.findDOMNode(this.refs[type]).scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
        });
    }

    render() {
        return (
            <div>
                <Header handleScroll={this.handleScroll} />

                <div className={styles.container}>
                    {this.props.children}
                </div>

                <HowItWorks ref="howitworks" />

                <Features ref="features" />

                <GetApp />

                <Footer />
            </div>
        );
    }
}
