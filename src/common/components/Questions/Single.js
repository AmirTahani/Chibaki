import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Row, Input } from 'antd';
import styles from './Single.module.styl';

export default class Multi extends Component {
    static propTypes = {
        question: PropTypes.objectOf(PropTypes.any).isRequired,
        answers: PropTypes.objectOf(PropTypes.any).isRequired,
        setAnswer: PropTypes.func.isRequired,
        onEnter: PropTypes.func.isRequired
    };

    state = {
        value: -1,
        options: [],
        textValue: ''
    };

    componentWillReceiveProps(nextProps) {
        const { question } = this.props;
        if (question._id !== nextProps.question._id) {
            this.setOptions(nextProps.question);
            this.setState({
                textValue: ''
            });
        }
    }

    componentDidMount() {
        this.setOptions(this.props.question);
    }

    onKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.props.onEnter();
        }
    };

    setValueOptionForGender = (option) => {
        switch (option) {
            case 'خانم':
                return 'female';
            case 'آقا':
                return 'male';
            case 'فرقی نمیکند':
                return 'na';
            default:
                return option;
        }
    }

    setOptions = (question) => {
        const { answers } = this.props;


        let result = question.options.map((option) => {
            if (answers[question._id]) {
                this.setState({
                    value: answers[question._id].selected_options[0]
                });
                return {
                    label: option,
                    value: this.setValueOptionForGender(option),
                    checked: answers[question._id].selected_options.includes(option)
                };
            }
            return {
                label: option,
                value: this.setValueOptionForGender(option),
                checked: false
            };
        });


        if (question.textOption) {
            if (answers[question._id] && answers[question._id].text_option) {
                this.setState({
                    textValue: answers[question._id].text_option,
                    value: question.textOption
                });
                result = [...result, { label: question.textOption, value: question.textOption, checked: true }];
            } else {
                result = [...result, { label: question.textOption, value: question.textOption, checked: false }];
            }
        }

        this.setState({
            options: result
        });
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
        this.generateAnswer(this.state.textValue, result);
    };

    generateAnswer = (textValue, options) => {
        const { setAnswer, question } = this.props;
        const result = options.reduce((acc, current) => {
            if (current.checked && current.label !== question.textOption) {
                acc.push(current.label);
                return acc;
            }
            return acc;
        }, []);
        const answer = {
            selected_options: result,
            text_option: textValue
        };
        setAnswer(question._id, answer);
    };

    getInputVisibility = () => {
        const { question } = this.props;
        const { options } = this.state;
        let shouldShow = false;
        if (question.textOption) {
            options.map((option) => {
                if (option.checked && option.label === question.textOption) {
                    shouldShow = true;
                    return option;
                }
                return option;
            });
        }
        return shouldShow;
    };

    onChangeTextOption = (e) => {
        this.setState({
            textValue: e.target.value
        });
        this.generateAnswer(e.target.value, this.state.options);
    };


    render() {
        const { question } = this.props;
        const { options } = this.state;
        const shouldShowInput = this.getInputVisibility();

        return (
            <div onKeyDown={this.onKeyDown}>
                <p className={styles.title}>{question.title}</p>
                <Radio.Group onChange={this.onChange} value={this.state.value} className={styles.radioGroup}>
                    {
                        options.map((option, index) => {
                            return (<Row key={option.value} className={styles.row}>
                                <Radio
                                    className={styles.radio}
                                    value={option.value}
                                    autoFocus={index === 0}
                                >
                                    {option.label}
                                </Radio>
                            </Row>);
                        })
                    }
                    {
                        shouldShowInput ? <div className={styles.inputWrapper}>
                            <Input
                                value={this.state.textValue}
                                placeholder="اینجا بنویسید"
                                onChange={this.onChangeTextOption}
                            />
                        </div> : null
                    }
                </Radio.Group>
            </div>
        );
    }
}
