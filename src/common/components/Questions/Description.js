import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import styles from './Description.module.styl';

export default class Description extends Component {
    static propTypes = {
        question: PropTypes.objectOf(PropTypes.any).isRequired,
        answers: PropTypes.objectOf(PropTypes.any).isRequired,
        setAnswer: PropTypes.func.isRequired,
        onEnter: PropTypes.func.isRequired
    };

    state = {
        value: ''
    };

    onKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.props.onEnter();
        }
    };

    onChangeTextOption = (e) => {
        const { question } = this.props;
        this.setState({
            value: e.target.value
        });
        const answer = {
            selected_options: [],
            text_option: e.target.value
        };
        this.props.setAnswer(question._id, answer);
    };

    componentDidMount() {
        const { answers, question } = this.props;
        if (answers[question._id] && answers[question._id].text_option) {
            this.setState({
                value: answers[question._id].text_option
            });
        }
    }

    render() {
        const { question } = this.props;
        return (
            <div>
                <p className={styles.title}>{question.title}</p>
                <div className={styles.inputWrapper}>
                    <Input
                        placeholder="توضیحات"
                        onChange={this.onChangeTextOption}
                        value={this.state.value}
                        autoFocus
                    />
                    <p className={styles.optionalText}>*این قسمت اختیاری است.</p>
                </div>
            </div>
        );
    }
}
