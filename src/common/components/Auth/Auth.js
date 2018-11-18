import React, { Component } from 'react';
import { Modal, Button, message, Icon } from 'antd';
import PropTypes from 'prop-types';
import styles from './Auth.module.styl';
import Login from './Login';
import Register from './Register';
import Verify from './Verify';
import Loader from '../../components/Kit/Loader/Loader';

export default class Auth extends Component {
    static propTypes = {
        showModal: PropTypes.bool.isRequired,
        toggleAuthModal: PropTypes.func.isRequired,
        verify: PropTypes.func.isRequired,
        setUserCode: PropTypes.func.isRequired,
        setUserLastName: PropTypes.func.isRequired,
        setUserName: PropTypes.func.isRequired,
        setUserMobile: PropTypes.func.isRequired,
        mobile: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        login: PropTypes.func.isRequired,
        loggingIn: PropTypes.bool.isRequired,
        register: PropTypes.func.isRequired,
        professions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired
    };

    state = {
        contents: [],
        step: 'login',
        prevStep: 'login',
        professionId: '',
        focusInput: true
    };

    handleSelectProfession = (professionId) => {
        this.setState({
            professionId
        });
    };

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
        if (mobile && /^[0-9]{11}$/.test(mobile)) {
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
        const { firstName, lastName, mobile } = this.props;
        const { professionId } = this.state;
        new Promise((resolve, reject) => {
            this.props.register({ firstName, lastName, mobile, professionId }, resolve, reject);
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
            window.location.href = `${window.location.host}/pages`;
        }).catch(() => {
            this.focusOutInput(true);
            message.error('لطفا کد را به درستی وارد کنید');
        }).finally(() => {
            hideLoading();
        });
    };

    handleClick = (e) => {
        e.preventDefault();
        const { step } = this.state;
        switch (step) {
            case 'login':
                this.handleLogin();
                break;
            case 'register':
                this.handleRegister();
                break;
            case 'verify':
                this.handleVerify();
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
            <div className={styles.btnContainer}>
                <button
                    className={`${styles.btnSubmit} c-btn c-btn--lg c-btn--primary`}
                    onClick={this.handleClick}
                    type="submit"
                    disabled={loggingIn}
                >
                    <div className={`${styles.btnWrapper} ${loggingIn ? styles.btnWrapperLoading : ''}`}>
                        {loggingIn ? <Loader
                            customWrapperClass={styles.btnLoader}
                            customDotClass={styles.btnLoaderDot}
                        /> : this.getButtonTitle()}
                    </div>
                </button>
                {
                    step !== 'login'
                        ? <button
                            className={`${styles.btnBack} c-btn`}
                            onClick={this.goBack}
                            type={'button'}
                        >
                            <div className={`${styles.btnWrapper} ${loggingIn ? styles.btnWrapperLoading : ''}`}>
                                <span>بازگشت</span>
                                <span className={`icon-back ${styles.btnBackIcon}`} />
                            </div>
                        </button>
                        : null
                }
            </div>
        );
    };

    getContentComponent = (focusInput) => {
        const { setUserMobile, setUserCode, setUserLastName, setUserName, professions, mobile, login } = this.props;
        const { step } = this.state;
        switch (step) {
            case 'login':
                return <Login focusInput={focusInput} setUserMobile={setUserMobile} mobile={mobile} />;
            case 'verify':
                return <Verify focusInput={focusInput} setUserCode={setUserCode} mobile={mobile} login={login} />;
            case 'register':
                return (<Register
                    focusInput={focusInput}
                    setUserLastName={setUserLastName}
                    setUserName={setUserName}
                    professions={professions}
                    selectProfession={this.handleSelectProfession}
                />);
            default:
                return <div />;
        }
    };

    onModalCancel = () => {
        this.props.toggleAuthModal();
        this.setState({
            step: 'login'
        });
    };

    componentDidMount() {
        message.config({
            maxCount: 1,
            top: 34
        });
    }

    render() {
        const { toggleAuthModal, showModal, loggingIn } = this.props;
        const { focusInput } = this.state;
        return (
            <Modal
                visible={showModal}
                className={styles.modal}
                centered
                footer={this.getButton()}
                maskClosable
                onCancel={this.onModalCancel}
                title={<img src="/assets/images/logo/logo-text.svg" alt="چی باکی - Chibaki" className={styles.logo} />}
            >
                <div className={styles.modalWrapper}>
                    <form onSubmit={this.handleClick}>
                        {
                            this.getContentComponent(focusInput)
                        }
                    </form>
                </div>
            </Modal>
        );
    }
}
