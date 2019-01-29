import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';

import styles from './Verify.module.styl';
import { persianNumber, toEnglishNumber } from '../../utils/persian';

export default class GetPhone extends Component {
    static propTypes = {
        question: PropTypes.objectOf(PropTypes.any).isRequired,
        answers: PropTypes.objectOf(PropTypes.any).isRequired,
        setUserCode: PropTypes.func.isRequired,
        submit: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired,
        mobile: PropTypes.string.isRequired
    };

    state = {
        code: '',
        coolDown: false,
        timer: 60
    };

    onKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.props.submit();
        }
    };

    onChangeCode = (e) => {
        const code = toEnglishNumber(e.target.value);

        this.setState({
            code
        });

        this.props.setUserCode(code);

        if (code.toString().length === 5) {
            this.props.submit({ verifyCode: code });
        }
    };

    timer = () => {
        this.setState({ coolDown: true, timer: 60 });
        const timeout = setInterval(() => {
            if (this.state.timer > 1) {
                this.setState({ timer: this.state.timer - 1 });
            } else {
                clearInterval(timeout);
                this.setState({ timer: 60, coolDown: false });
            }
        }, 1000);
    };

    resend = () => {
        this.props.login(this.props.mobile);
        this.timer();
    };

    componentDidMount() {
        this.timer();
        const { answers, question } = this.props;
        if (answers[question._id] && answers[question._id].text_option) {
            this.setState({
                value: answers[question._id].text_option
            });
        }
    }

    render() {
        const { question } = this.props;
        const { coolDown } = this.state;

        return (
            <div>
                <p className={styles.title}>{question.title}</p>
                <div className={styles.inputWrapper}>
                    <Input
                        placeholder="لطفا کد را وارد کنید."
                        onChange={this.onChangeCode}
                        disabled={verifying}
                        value={this.state.code}
                        autoFocus
                    />
                    {
                        coolDown ?
                            <p className={styles.text}>
                                {persianNumber(this.state.timer)}
                                {' '}
                                ثانیه مانده تا ارسال مجدد
                            </p>
                            : <Button
                                className={styles.resendButton}
                                type="primary"
                                onClick={this.resend}
                                disabled={coolDown}
                            >
                                <p className={styles.resendText}>ارسال مجدد</p>
                            </Button>
                    }
                </div>
            </div>
        );
    }
}
