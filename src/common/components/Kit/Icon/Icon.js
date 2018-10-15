import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Icon extends Component {
    static propTypes = {
        iconName: PropTypes.string.isRequired,
        size: PropTypes.number,
        color: PropTypes.string
    };

    static defaultProps = {
        size: 15,
        color: '#000000'
    };

    render() {
        const { iconName, size, color } = this.props;
        return (
            <img
                style={{ width: size, height: size, fill: color }}
                src={require(`../../../../../public/assets/images/icon/${iconName}.svg`)}
                alt={iconName}
            />
        );
    }
}
