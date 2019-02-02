import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Kit/Loader/Loader';
import { redirectToProfile } from '../../utils/helpers';
import styles from './Auth.module.styl';

class Auth extends Component {
    static propTypes = {
        loggingIn: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired
    };

    handleSelectProfession = (professionId) => {
        this.setState({
            professionId
        });
    };

    toggleRegisterRole = (role) => {
        this.setState({
            registerRole: role
        });
    }

    focusOutInput = (refocus = false) => {
        this.setState({
            focusInput: false
        }, () => {
            if (refocus) {
                this.setState({
                    focusInput: true
                });
            }
        });
    };

    handleLogin = () => {
        const { mobile } = this.props;
        if (mobile) {
            this.focusOutInput();
            const hideLoading = message.loading('در حال ارسال کد...');
            new Promise((resolve, reject) => {
                this.props.login(mobile, resolve, reject);
            })
                .then(() => {
                    message.success('کد با موفقیت ارسال شد!');
                    this.setState({
                        step: 'verify',
                        prevStep: 'login'
                    });
                })
                .catch((error) => {
                    if (error.status === 422) {
                        this.setState({
                            step: 'register'
                        });
                    }
                })
                .finally(() => {
                    hideLoading();
                });
        } else {
            message.error('لطفا شماره موبایل خود را به درستی وارد کنید.', 4);
            this.focusOutInput(true);
        }
    };

    handleRegister = () => {
        const { firstName, lastName, mobile, gender, agreement } = this.props;
        const { registerRole, professionId } = this.state;
        if (!gender) {
            return message.error('لطفا جنسیت خود را انتخاب کنید!');
        }
        if (registerRole === 'proficient' && !professionId) {
            return message.error('لطفا تخصص خود را انتخاب کنید!');
        }
        if (!agreement) {
            return message.error('لطفا قوانین و مقررات را تایید کنید');
        }

        new Promise((resolve, reject) => {
            this.props.register({ firstName, lastName, mobile, professionId, gender }, resolve, reject);
        }).then(() => {
            this.setState({
                step: 'verify',
                prevStep: 'register'
            });
        });
    };

    handleVerify = () => {
        const { code } = this.props;

        if (!code || !(/^[0-9]{5}$/.test(code))) {
            this.focusOutInput(true);
            return message.error('لطفا کد را به درستی وارد کنید');
        }

        const hideLoading = message.loading('ارسال...');
        new Promise((resolve, reject) => {
            this.props.verify(code, resolve, reject);
        }).then(() => {
            this.props.toggleAuthModal();
            redirectToProfile();
        }).catch(() => {
            this.focusOutInput(true);
            message.error('لطفا کد را به درستی وارد کنید');
        }).finally(() => {
            hideLoading();
        });
    };

    handleClick = (e) => {
        e && e.preventDefault();
        if (!ReactDom.findDOMNode(this.formRef).reportValidity()) return false;

        const { step } = this.state;
        switch (step) {
            case 'login':
                return this.handleLogin();
            case 'register':
                return this.handleRegister();
            case 'verify':
                return this.handleVerify();
        }
    };

    goBack = (e) => {
        const { step, prevStep } = this.state;
        switch (step) {
            case 'verify':
                this.setState({
                    step: prevStep
                });
                break;
            case 'signup':
            default:
                this.setState({
                    step: 'login'
                });
        }
    };

    getButtonTitle = () => {
        const { step } = this.state;
        switch (step) {
            case 'login':
            default:
                return 'ادامه';
            case 'register':
                return 'ثبت نام';
            case 'verify':
                return 'تایید';
        }
    };

    getButton = () => {
        const { step } = this.state;
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
                        {this.props.children}
                    </div>
                    <div className={styles.footer}>
                        <button
                            className={`${styles.btnSubmit} c-btn c-btn--lg c-btn--primary`}
                            onClick={this.handleClick}
                            type="submit"
                            disabled={loggingIn}
                        >
                            <div className={`${styles.btnWrapper} ${loggingIn ? styles.btnWrapperLoading : ''}`}>
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

export default connect(state => ({
    loggingIn: state.auth.loggingIn
}))(Auth);
