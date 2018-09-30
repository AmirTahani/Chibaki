import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Radio } from 'antd';
import DatePicker from '../Kit/Calendar/DatePicker';
import styles from './SingleWithDatePicker.module.css';

export default class SingleWithDatePicker extends Component {
    static propTypes = {
        question: PropTypes.objectOf(PropTypes.any).isRequired
    };

    state = {
        options: [],
        shouldShowDatePicker: false,
        value: -1
    };

    componentDidMount() {
        this.setOptions(this.props.question);
    }

    componentWillReceiveProps(nextProps) {
        const { question } = this.props;
        if (question._id !== nextProps.question._id) {
            this.setOptions(nextProps.question);
        }
    }

    setOptions = (question) => {
        const options = question.options.map(option => {
            return {
                ...option,
                value: option.title,
                checked: false
            };
        });

        this.setState({
            options
        });
    };

    onChangeTextOption = (e) => {
        const { question } = this.props;
        const answer = {
            selected_options: [],
            text_option: e.target.value
        };
        this.props.setAnswer(question._id, answer);
    };

    getShouldShowDatePicker = () => {
        const { question } = this.props;
        const { options } = this.state;
        let shouldShowDatePicker = false;
        options.map(option => {
            if (option.hasDatePicker && option.checked) {
                shouldShowDatePicker = true;
            }
        });
        return shouldShowDatePicker;
    };

    onChangeDate = (date) => {
        console.log(date, 'date');
    };

    onChange = (e) => {
        const { options } = this.state;
        const result = options.map(option => {
            if (option.value === e.target.value) {
                return {
                    ...option,
                    checked: true
                };
            } else {
                return {
                    ...option,
                    checked: false
                };
            }
        });
        this.setState({
            options: result,
            value: e.target.value
        });
    };

    render() {
        const { question } = this.props;
        const { options, value } = this.state;
        const shouldShowDatePicker = this.getShouldShowDatePicker();
        console.log(options, ' its here');
        return (
            <div>
                <p className={styles.title}>{question.title}</p>
                <Radio.Group onChange={this.onChange} value={value}>
                    {
                        options.map(option => {
                            return <Row className={styles.row}>
                                <Radio value={option.value}>{option.title}</Radio>
                            </Row>
                        })
                    }
                </Radio.Group>
                {
                    shouldShowDatePicker ? <DatePicker onChange={this.onChangeDate} /> : null
                }
            </div>
        );
    }
}