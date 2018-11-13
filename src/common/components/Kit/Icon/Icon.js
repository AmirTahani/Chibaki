import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Icon extends Component {
    static propTypes = {
        iconName: PropTypes.string.isRequired,
        size: PropTypes.number,
        color: PropTypes.string,
        fontSize: PropTypes.number,
        customStyle: PropTypes.objectOf(PropTypes.any)
    };

    static defaultProps = {
        size: 70,
        color: '#1e87f0',
        fontSize: 55,
        customStyle: {}
    };

    getStyles = () => {
        const { size, color, fontSize, customStyle } = this.props;
        return {
            color,
            width: size,
            height: size,
            'font-size': fontSize,
            ...customStyle
        };
    };

    render() {
        const { iconName } = this.props;
        return (
            <span className={`icon-${iconName}`} style={this.getStyles()} />
        );
    }
}
