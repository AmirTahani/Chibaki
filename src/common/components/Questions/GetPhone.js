import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import styles from './GetPhone.module.css';

export default class GetPhone extends Component {
    static propTypes = {
        question: PropTypes.objectOf(PropTypes.any).isRequired
    };

    state = {
        value: ''
    };

    componentDidMount() {
        const { answers, question } = this.props;
        if (answers[question._id] && answers[question._id].text_option) {
            this.setState({
                value: answers[question._id].text_option
            });
        }
    }

    onChangeMobile = (e) => {
        this.setState({
            value: e.target.value
        });
        this.props.setUserMobile(e.target.value);
    };

    render() {
        const { question } = this.props;
        return (
            <div>
                <p className={styles.title}>{question.title}</p>
                <div className={styles.inputWrapper}>
                    <Input
                        placeholder="لطفا شماره خود را وارد کنید."
                        onChange={this.onChangeMobile}
                        value={this.state.value}
                    />
                </div>
            </div>
        );
    }
}