import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import styles from './Verify.module.css';

export default class GetPhone extends Component {
    static propTypes = {
        question: PropTypes.objectOf(PropTypes.any).isRequired,
        answers: PropTypes.objectOf(PropTypes.any).isRequired,
        setUserCode: PropTypes.func.isRequired,
        submit: PropTypes.func.isRequired
    };

    state = {
        value: ''
    };
    onChangeMobile = (e) => {
        this.setState({
            value: e.target.value
        });
        if (e.target.value.toString().length === 5) {
            this.props.submit();
        }
        this.props.setUserCode(e.target.value);
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
                        placeholder="لطفا کد را وارد کنید."
                        onChange={this.onChangeMobile}
                        value={this.state.value}
                    />
                </div>
            </div>
        );
    }
}
