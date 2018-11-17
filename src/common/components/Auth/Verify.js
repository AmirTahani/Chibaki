import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Progress } from 'antd';
import { persianNumber } from '../../utils/persian';
import styles from './Verify.module.styl';

export default class Verify extends Component {
    static propTypes = {
        setUserCode: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired,
        mobile: PropTypes.string.isRequired
    };

    state = {
        value: '',
        coolDown: false,
        timer: 60
    };

    onChangeCode = (e) => {
        this.setState({
            value: e.target.value
        });
        this.props.setUserCode(e.target.value);
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

    resend = (e) => {
        e.preventDefault();
        this.props.login(this.props.mobile);
        this.timer();
        return false;
    };

    componentWillMount() {
        this.timer();
    }

    componentDidMount() {
        this.inputRef.focus();
    }

    render() {
        const { coolDown } = this.state;
        return (
            <div>
                <div className={styles.inputWrapper}>
                    <label className={styles.fieldLabel} htmlFor="verifyField">لطفا کد را وارد کنید.</label>
                    <Input
                        placeholder="کد ۵ رقمی"
                        onChange={this.onChangeCode}
                        value={this.state.value}
                        className={styles.input}
                        name="verifyField"
                        id="verifyField"
                        autoFocus
                        ref={(c) => { this.inputRef = c; }}
                    />
                    {
                        coolDown ?
                            <p className={styles.text}>
                                <Progress
                                    className={styles.progress}
                                    type={'circle'}
                                    percent={this.state.timer * 1.666666666666}
                                    width={50}
                                    format={() => this.state.timer}
                                />
                                ثانیه مانده تا ارسال مجدد
                            </p>
                            : <a
                                className={styles.resendButton}
                                type="primary"
                                onClick={this.resend}
                                disabled={coolDown}
                            >
                                ارسال مجدد کد
                            </a>
                    }
                </div>
            </div>
        );
    }
}
