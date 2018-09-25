import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

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

    getDefaultValues = (options) => {
        return options.map(option => {
            if (option.checked) {
                return option;
            }
        });
    };

    render() {
        const { question } = this.props;
        const options = this.getOptions();
        const defaultValues = this.getDefaultValues(options);

        return (
            <div>
                <p>{question.title}</p>
                <Checkbox.Group options={options} defaultValue={defaultValues} onChange={this.onChange} />
            </div>
        );
    }
}