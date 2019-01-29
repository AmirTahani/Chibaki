import ReactDom from 'react-dom';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, message } from 'antd';
import Loader from '../../components/Kit/Loader/Loader';
import styles from './Login.module.styl';
import {
    login,
    setUserMobile
} from '../../redux/modules/auth';
import { phoneNumberRegex, toEnglishNumber } from '../../utils/persian';

class Login extends Component {
    static propTypes = {
        setUserMobileConnect: PropTypes.func.isRequired,
        mobile: PropTypes.string.isRequired,
        loginConnect: PropTypes.func.isRequired,
        loggingIn: PropTypes.bool.isRequired,
        history: PropTypes.objectOf(PropTypes.any).isRequired,
        changeStepConnect: PropTypes.func.isRequired,
        step: PropTypes.string.isRequired,
        prevStep: PropTypes.string.isRequired
    };

    state = {
        mobile: ''
    };

    onChangeMobile = (e) => {
        const mobile = toEnglishNumber(e.target.value);

        this.setState({
            mobile
        }, () => {
            if (this.validateInput(mobile)) {
                this.props.setUserMobileConnect(mobile);
            }
        });
    };

    onFormSubmit = (event) => {
        event && event.preventDefault();
        const { mobile, history, changeStepConnect } = this.props;

        if (mobile) {
            this.blurInput({});

            const hideLoading = message.loading('در حال ارسال کد');

            new Promise((resolve, reject) => {
                this.props.loginConnect(mobile, resolve, reject);
            }).then(() => {
                message.success('کد با موفقیت ارسال شد!');

                history.push('/verify');
            }).catch((error) => {
                this.blurInput({ refocus: true });

                if (error.status === 422) {
                    history.push('/register');
                }
            }).finally(() => {
                hideLoading();
            });
        }
    }

    validateInput = (mobile = this.state.mobile) => {
        if (!mobile) {
            ReactDom.findDOMNode(this.inputRef).setCustomValidity('لطفا شماره موبایل را وارد کنید!');
            return false;
        }
        if (!phoneNumberRegex.test(mobile)) {
            ReactDom.findDOMNode(this.inputRef).setCustomValidity('لطفا شماره موبایل را به درستی وارد کنید!');
            return false;
        }
        ReactDom.findDOMNode(this.inputRef).setCustomValidity('');
        return true;
    };

    componentDidMount() {
        this.validateInput(this.props.mobile);
        this.inputRef.focus();
    }

    render() {
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
                            <label htmlFor="field" className={styles.fieldLabel}>
                            لطفا شماره موبایل خود را وارد کنید:
                            </label>
                            <Input
                                name="field"
                                type="text"
                                inputMode="numeric"
                                value={this.state.mobile}
                                id="field"
                                placeholder="مثال: 09123456789"
                                required
                                pattern={phoneNumberRegex.toString().slice(1, -1)}
                                autoFocus
                                className={styles.input}
                                onChange={this.onChangeMobile}
                                onBlur={this.blurInput}
                                onFocus={this.focusInput}
                                ref={(c) => {
                                    this.inputRef = c;
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.footer}>
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
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(connect(state => ({
    mobile: state.auth.mobile,
    loggingIn: state.auth.loggingIn,
    step: state.auth.step,
    prevStep: state.auth.prevStep
}), {
    loginConnect: login,
    setUserMobileConnect: setUserMobile,
    changeStepConnect: changeStep
})(Login));
