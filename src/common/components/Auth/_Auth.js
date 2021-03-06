import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Modal, message, Spin } from 'antd';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styles from './Auth.module.styl';
// import Login from './Login';
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
        setUserGender: PropTypes.func.isRequired,
        setUserMobile: PropTypes.func.isRequired,
        mobile: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        login: PropTypes.func.isRequired,
        loggingIn: PropTypes.bool.isRequired,
        register: PropTypes.func.isRequired,
        professions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        toggleAgreement: PropTypes.func.isRequired,
        agreement: PropTypes.bool.isRequired
    };

    state = {
        contents: [],
        step: 'login',
        prevStep: 'login',
        professionId: '',
        focusInput: true,
        registerRole: 'proficient'
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
            window.location.href = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/pages`;
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
            <div className={styles.btnContainer}>
                <button
                    className={`${styles.btnSubmit} c-btn c-btn--lg c-btn--primary`}
                    onClick={this.handleClick}
                    type="submit"
                    disabled={loggingIn}
                    form={'modalForm'}
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
        const {
            setUserMobile,
            setUserCode,
            setUserLastName,
            setUserName,
            professions,
            gender,
            mobile,
            login,
            setUserGender,
            toggleAgreement,
            agreement,
            toggleAuthModal
        } = this.props;
        const { step } = this.state;
        switch (step) {
            case 'login':
                // return <Login focusInput={focusInput} setUserMobile={setUserMobile} mobile={mobile} />;
                return <Spin />;
            case 'verify':
                return <Verify focusInput={focusInput} setUserCode={setUserCode} mobile={mobile} login={login} />;
            case 'register':
                return (<Register
                    focusInput={focusInput}
                    setUserLastName={setUserLastName}
                    setUserGender={setUserGender}
                    setUserName={setUserName}
                    professions={professions}
                    gender={gender}
                    toggleRegisterRole={this.toggleRegisterRole}
                    registerRole={this.state.registerRole}
                    submit={this.handleClick}
                    selectProfession={this.handleSelectProfession}
                    toggleAgreement={toggleAgreement}
                    agreement={agreement}
                    toggleAuthModal={toggleAuthModal}
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
        const { step, focusInput } = this.state;
        return (
            <Modal
                visible={showModal}
                className={`${styles.modal} ${step === 'register' ? styles.modalRegister : ''}`}
                centered
                footer={this.getButton()}
                maskClosable={false}
                onCancel={this.onModalCancel}
                title={<img src="/assets/images/logo/logo-text.svg" alt="چی باکی - Chibaki" className={styles.logo} />}
            >
                {
                    showModal
                        ? <Helmet>
                            <style type="text/css">{`
                                .ant-modal-mask {
                                    background-color: #fff !important;
                                }
                                .ant-modal-mask:after {
                                    content: '';

                                    position: absolute;

                                    left: 0;
                                    top: 0;

                                    width: 100%;
                                    height: 100%;

                                    z-index: 0;

                                    background: #fff url('/assets/images/pattern/pattern-dark-blue.svg') center center / 240px repeat;
                                    opacity: .1;
                                }
                            `}</style>
                        </Helmet>
                        : null
                }
                <div className={styles.modalWrapper}>
                    <form
                        id={'modalForm'}
                        className={styles.form}
                        ref={(c) => {
                            this.formRef = c;
                        }}
                        onSubmit={this.handleClick}
                    >
                        {
                            this.getContentComponent(focusInput)
                        }
                    </form>
                </div>
            </Modal>
        );
    }
}
