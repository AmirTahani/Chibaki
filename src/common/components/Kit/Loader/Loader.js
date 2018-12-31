import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Loader.module.styl';

export default class Loader extends Component {
    static propTypes = {
        customDotStyle: PropTypes.objectOf(PropTypes.any),
        customWrapperStyle: PropTypes.objectOf(PropTypes.any),

        customDotClass: PropTypes.string,
        customWrapperClass: PropTypes.string
    };

    static defaultProps = {
        customDotStyle: {},
        customWrapperStyle: {},

        customDotClass: '',
        customWrapperClass: ''
    };

    render() {
        const { customDotStyle, customWrapperStyle, customDotClass, customWrapperClass } = this.props;
        return (
            <div className={`${styles.spinner} ${customWrapperClass}`} style={customWrapperStyle}>
                <div className={`${styles.dot1} ${customDotClass}`} style={customDotStyle} />
                <div className={`${styles.dot2} ${customDotClass}`} style={customDotStyle} />
            </div>
        );
    }
}
