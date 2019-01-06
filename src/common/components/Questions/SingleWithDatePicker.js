import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Radio } from 'antd';
import moment from 'moment-jalali';
import DatePicker from '../Kit/Calendar/DatePicker';
import styles from './SingleWithDatePicker.module.styl';

export default class SingleWithDatePicker extends Component {
    static propTypes = {
        question: PropTypes.objectOf(PropTypes.any).isRequired,
        answers: PropTypes.objectOf(PropTypes.any).isRequired,
        setAnswer: PropTypes.func.isRequired,
        onEnter: PropTypes.func.isRequired
    };

    state = {
        options: [],
        value: -1,
        date: ''
    };

    onKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.props.onEnter();
        }
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
        const { answers } = this.props;
        const result = question.options.map((option) => {
            if (answers[question._id] && answers[question._id].selected_options.includes(option)) {
                return {
                    ...option,
                    value: option.title,
                    checked: true
                };
            } else if (answers[question._id] && answers[question._id].text_option) {
                return {
                    ...option,
                    value: option.title,
                    checked: option.hasDatePicker
                };
            }
            return {
                ...option,
                value: option.title,
                checked: false
            };
        });
        if (answers[question._id] && answers[question._id].text_option) {
            this.setState({
                options: result,
                date: answers[question._id].text_option,
                value: answers[question._id].selected_options[0]
            });
        } else if (answers[question._id] && answers[question._id].selected_options.length) {
            this.setState({
                options: result,
                date: '',
                value: answers[question._id].selected_options[0]
            });
        }
        this.setState({
            options: result,
            date: ''
        });
    };

    onChangeTextOption = (e) => {
        this.generateAnswer(this.state.date, e.target.value);
    };

    getShouldShowDatePicker = () => {
        const { options } = this.state;
        let shouldShowDatePicker = false;
        options.map((option) => {
            if (option.hasDatePicker && option.checked) {
                shouldShowDatePicker = true;
                return option;
            }
            return option;
        });
        return shouldShowDatePicker;
    };

    onChangeDate = (date) => {
        this.setState({
            date: date.format('jYYYY/jM/jD')
        });
        this.generateAnswer(date.format('jYYYY/jM/jD'), this.state.options);
    };

    onChange = (e) => {
        const { options } = this.state;
        const result = options.map((option) => {
            if (option.value === e.target.value) {
                return {
                    ...option,
                    checked: true
                };
            }
            return {
                ...option,
                checked: false
            };
        });
        this.setState({
            options: result,
            value: e.target.value
        });
        this.generateAnswer(this.state.date, result);
    };

    generateAnswer = (date, options) => {
        const { setAnswer, question } = this.props;
        const result = options.reduce((acc, current) => {
            if (current.checked) {
                acc.push(current.title);
                return acc;
            }
            return acc;
        }, []);
        const answer = {
            selected_options: result,
            text_option: date
        };
        setAnswer(question._id, answer);
    };

    render() {
        const { question } = this.props;
        const { options, value } = this.state;
        const shouldShowDatePicker = this.getShouldShowDatePicker();
        return (
            <div>
                <p className={styles.title}>{question.title}</p>
                <Radio.Group onChange={this.onChange} value={value}>
                    {
                        options.map((option, index) => {
                            return (
                                <Row key={option.value} className={styles.row}>
                                    <Radio value={option.value} autoFocus={index === 0}>{option.title}</Radio>
                                </Row>
                            );
                        })
                    }
                </Radio.Group>
                {
                    shouldShowDatePicker ? <div className={styles.datePickerWrapper}>
                        <DatePicker
                            defaultValue={this.state.date ? moment(this.state.date, 'jYYYY/jM/jD') : false}
                            onChange={this.onChangeDate}
                            className={styles.inputFieldDatePicker}
                            inputPlaceholder="تاریخ را وارد کنید"
                        />
                    </div> : null
                }
            </div>
        );
    }
}
