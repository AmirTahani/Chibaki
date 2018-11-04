import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Row, Input } from 'antd';
import styles from './Multi.module.styl';

export default class Multi extends Component {
    static propTypes = {
        question: PropTypes.objectOf(PropTypes.any).isRequired,
        answers: PropTypes.objectOf(PropTypes.any).isRequired,
        setAnswer: PropTypes.func.isRequired


    };

    state = {
        options: [],
        textValue: '',
        answer: {}
    };


    componentWillReceiveProps(nextProps) {
        const { question } = this.props;
        if (question._id !== nextProps.question._id) {
            this.setOptions(nextProps.question);
        }
    }

    componentDidMount() {
        this.setOptions(this.props.question);
    }

    setOptions = (question) => {
        const { answers } = this.props;

        const result = question.options.map((option) => {
            return {
                label: option,
                value: option,
                checked: answers[question._id] && answers[question._id].selected_options.includes(option)
            };
        });


        if (question.textOption) {
            this.setState({
                textValue: answers[question._id] && answers[question._id].text_option ? answers[question._id].text_option : '',
                options: [...result, {
                    label: question.textOption,
                    value: question.textOption,
                    checked: !!(answers[question._id] && answers[question._id].text_option)
                }]
            });
        } else {
            this.setState({
                options: result,
                textValue: ''
            });
        }
    };

    onChange = (selecteOption) => {
        const { options } = this.state;
        const result = options.map((option) => {
            if (option.label === selecteOption.label) {
                return {
                    ...option,
                    checked: !option.checked
                };
            }
            return option;
        });
        this.setState({
            options: result
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
            <div>
                <p className={styles.title}>{question.title}</p>
                {
                    options.map((option) => {
                        return (
                            <Row key={option.label} className={styles.row}>
                                <Checkbox
                                    checked={option.checked}
                                    disabled={option.disabled}
                                    onChange={() => this.onChange(option)}
                                >
                                    {option.label}
                                </Checkbox>
                            </Row>
                        );
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
            </div>
        );
    }
}
