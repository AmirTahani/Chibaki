import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
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

    resend = () => {
        this.props.login(this.props.mobile);
        this.timer();
    };

    componentWillMount() {
        this.timer();
    }

    render() {
        const { coolDown } = this.state;
        return (
            <div>
                <div className={styles.inputWrapper}>
                    <Input
                        placeholder="لطفا کد را وارد کنید."
                        onChange={this.onChangeCode}
                        value={this.state.value}
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
