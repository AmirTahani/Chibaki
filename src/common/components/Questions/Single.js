import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

export default class Multi extends Component {
    static propTypes = {
        question: PropTypes.objectOf(PropTypes.any).isRequired
    };

    getOptions = () => {
        const { question } = this.props;
        return question.options.map(option => {
            return {
                label: option,
                value: option,
                checked: false
            };
        });
    };

    onChange = (value) => {
        console.log(value);
    };

    render() {
        const { question } = this.props;
        const options = this.getOptions();

        return (
            <div>
                <p>{question.title}</p>
                <Radio.Group options={options} onChange={this.onChange} />
            </div>
        );
    }
}