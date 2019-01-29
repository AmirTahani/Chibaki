import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, Progress, message } from 'antd';
import Loader from '../../components/Kit/Loader/Loader';
import {
    setUserCode,
    login,
    verify
} from '../../redux/modules/auth';
import {
    toEnglishNumber, persianRegex
} from '../../utils/persian';
import styles from './Verify.module.styl';

class Verify extends React.Component {
    static propTypes = {
        setUserCodeConnect: PropTypes.func.isRequired,
        loginConnect: PropTypes.func.isRequired,
        mobile: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        verifyConnect: PropTypes.func.isRequired,
        loggingIn: PropTypes.bool.isRequired,
        history: PropTypes.objectOf(PropTypes.any).isRequired
    };

    state = {
        coolDown: false,
        timer: 60,
        code: '',
        sentOnce: false
    };

    onFormSubmit = (code = this.props.code) => {
        this.blurInput();

        if (!this.state.sentOnce) {
            this.setState({
                sentOnce: true
            });
        }

        if (!code || !(/^[0-9]{5}$/.test(code))) {
            this.focusInput();
            return message.error('لطفا کد را به درستی وارد کنید');
        }

        const hideLoading = message.loading('ارسال...');

        new Promise((resolve, reject) => {
            this.props.verifyConnect(code, resolve, reject);
        }).then(() => {
            window.location.href = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/pages`;
        }).catch(() => {
            this.focusInput();
            message.error('لطفا کد را به درستی وارد کنید');
        }).finally(() => {
            hideLoading();
        });
    };

    onChangeCode = (e) => {
        const code = toEnglishNumber(e.target.value);

        this.validateInput(code);

        this.setState({
            code
        });

        this.props.setUserCodeConnect(code);

        if (code.toString().length === 5 && !this.state.sentOnce) {
            this.onFormSubmit(code);
        }
    };

    validateInput = (code) => {
        if (!code) {
            ReactDOM.findDOMNode(this.inputRef).setCustomValidity('کد ارسال شده را وارد کنید');
            return false;
        }
        if (!/\d{5}/.test(code)) {
            ReactDOM.findDOMNode(this.inputRef).setCustomValidity('لطفا کد ۵ رقمی را انگلیسی وارد کنید');
            return false;
        }
        return true;
    }

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
        this.props.loginConnect(this.props.mobile);
        this.timer();
        this.inputRef.focus();
        return false;
    };

    handleGoBack = () => {
        this.props.history.goBack();
    };

    focusInput = () => {
        this.inputRef.focus();
    };

    blurInput = () => {
        this.inputRef.blur();
    };

    componentWillMount() {
        this.timer();
    }

    componentDidMount() {
        this.props.setUserCodeConnect('');
        this.inputRef.focus();
    }

    render() {
        const { coolDown } = this.state;
        const { loggingIn } = this.props;

        return (
            <div
                className={styles.wrapper}
            >
                <form
                    onSubmit={this.onFormSubmit}
                    className={styles.content}
                >
                    <div className={styles.header}>
                        <h1>
                            <Link to="/" className={styles.logo}>
                                <img
                                    src="/assets/images/logo/logo-text.svg"
                                    alt="چی باکی - Chibaki"
                                    className={styles.logoImg}
                                />
                            </Link>
                        </h1>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.inputWrapper}>
                            <label className={styles.fieldLabel} htmlFor="verifyField">لطفا کد را وارد کنید.</label>
                            <Input
                                placeholder="کد ۵ رقمی"
                                onChange={this.onChangeCode}
                                value={this.state.code}
                                className={styles.input}
                                name="verifyField"
                                id="verifyField"
                                pattern="\d{5}"
                                maxLength="5"
                                autoFocus
                                required
                                ref={(c) => { this.inputRef = c; }}
                            />
                            {
                                coolDown
                                    ? (
                                        <div className={styles.text}>
                                            <Progress
                                                className={styles.progress}
                                                type="circle"
                                                percent={this.state.timer * 1.666666666666}
                                                width={50}
                                                format={() => this.state.timer}
                                            />
                                ثانیه مانده تا ارسال مجدد
                                        </div>
                                    )
                                    : (
                                        <a
                                            className={styles.resendButton}
                                            type="primary"
                                            onClick={this.resend}
                                            disabled={coolDown}
                                        >
                                            <span className={`icon-reload ${styles.reloadIcon}`} />
                                ارسال مجدد کد
                                        </a>
                                    )
                            }
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.btnWrapper}>
                            <button
                                className={`${styles.btnSubmit} c-btn c-btn--lg c-btn--primary`}
                                onClick={this.handleClick}
                                type="submit"
                                disabled={loggingIn}
                            >
                                <div className={`${styles.btnInner} ${loggingIn ? styles.btnInnerLoading : ''}`}>
                                    { loggingIn ? (
                                        <Loader
                                            customWrapperClass={styles.btnLoader}
                                            customDotClass={styles.btnLoaderDot}
                                        />
                                    ) : 'ادامه' }
                                </div>
                            </button>
                            <button
                                className={`${styles.btnBack} c-btn`}
                                onClick={this.handleGoBack}
                                type="button"
                            >
                                <div className={`${styles.btnInner} ${loggingIn ? styles.btnInnerLoading : ''}`}>
                                    <span>بازگشت</span>
                                    <span className={`icon-back ${styles.btnBackIcon}`} />
                                </div>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(state => ({
    mobile: state.auth.mobile,
    code: state.auth.code,
    loggingIn: state.auth.loggingIn,
    prevStep: state.auth.prevStep
}), {
    loginConnect: login,
    setUserCodeConnect: setUserCode,
    verifyConnect: verify
})(Verify);
