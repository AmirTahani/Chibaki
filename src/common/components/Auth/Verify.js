import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Progress } from 'antd';
import { persianNumber } from '../../utils/persian';
import styles from './Verify.module.styl';

export default class Verify extends Component {
    static propTypes = {
        setUserCode: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired,
        mobile: PropTypes.string.isRequired,
        focusInput: PropTypes.bool
    };

    static defaultProps = {
        focusInput: false
    };

    state = {
        value: '',
        coolDown: false,
        timer: 60,
        focusInput: true
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
        this.inputRef.focus();
        return false;
    };

    onFieldFocus = () => {
        this.setState({
            focusInput: true
        });
    };

    onFieldBlur = () => {
        this.setState({
            focusInput: false
        });
    };

    componentWillMount() {
        this.timer();
    }

    componentDidMount() {
        this.props.setUserCode('');
        this.inputRef.focus();
    }

    componentDidUpdate(prevProps) {
        const { focusInput } = this.props;
        if (prevProps.focusInput !== focusInput && this.state.focusInput !== focusInput) {
            if (focusInput) {
                this.inputRef.focus();
            } else {
                this.inputRef.blur();
            }
        }
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
                        onBlur={this.onFieldBlur}
                        onFocus={this.onFieldFocus}
                        value={this.state.value}
                        className={styles.input}
                        name="verifyField"
                        id="verifyField"
                        autoFocus
                        required
                        ref={(c) => { this.inputRef = c; }}
                    />
                    {
                        coolDown ?
                            <div className={styles.text}>
                                <Progress
                                    className={styles.progress}
                                    type={'circle'}
                                    percent={this.state.timer * 1.666666666666}
                                    width={50}
                                    format={() => this.state.timer}
                                />
                                ثانیه مانده تا ارسال مجدد
                            </div>
                            : <a
                                className={styles.resendButton}
                                type="primary"
                                onClick={this.resend}
                                disabled={coolDown}
                            >
                                <span className={`icon-reload ${styles.reloadIcon}`} />
                                ارسال مجدد کد
                            </a>
                    }
                </div>
            </div>
        );
    }
}
