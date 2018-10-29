import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './Auth.module.styl';
import Login from './Login';
import Register from './Register';
import Verify from './Verify';


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
        register: PropTypes.func.isRequired,
        professions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired
    };

    state = {
        contents: [],
        step: 0,
        professionId: ''
    };

    handleSelectProfession = (professionId) => {
        this.setState({
            professionId
        });
    };

    handleLogin = () => {
        const { mobile, setUserLastName, setUserName, professions, setUserCode } = this.props;
        if (mobile) {
            new Promise((resolve, reject) => {
                this.props.login(mobile, resolve, reject);
            }).then(() => {
                this.setState({
                    contents: [...this.state.contents, {
                        title: 'کد تایید',
                        content: <Verify
                            setUserCode={setUserCode}
                            mobile={mobile}
                            login={this.props.login}
                        />,
                        _id: 'verify'
                    }],
                    step: this.state.step + 1
                });
            }).catch((error) => {
                if (error.status === 422) {
                    this.setState({
                        contents: [...this.state.contents, {
                            title: 'ثبت نام',
                            content: <Register
                                setUserLastName={setUserLastName}
                                setUserName={setUserName}
                                professions={professions}
                                selectProfession={this.handleSelectProfession}
                            />,
                            _id: 'register'
                        }, {
                            title: 'کد تایید',
                            content: <Verify
                                setUserCode={setUserCode}
                                mobile={mobile}
                                login={this.props.login}
                            />,
                            _id: 'verify'
                        }],
                        step: this.state.step + 1
                    })
                    ;
                }
            });
        }
    };

    handleRegister = () => {
        const { firstName, lastName, mobile } = this.props;
        const { professionId } = this.state;
        new Promise((resolve, reject) => {
            this.props.register({ firstName, lastName, mobile, professionId }, resolve, reject);
        }).then(() => {
            this.setState({
                step: this.state.step + 1
            });
        });
    };

    handleVerify = () => {
        const { code } = this.props;
        new Promise((resolve, reject) => {
            this.props.verify(code, resolve, reject);
        }).then(() => {
            this.props.toggleAuthModal();
        });
    };

    handleClick = () => {
        const { contents, step } = this.state;
        if (contents && contents.length && contents[step]._id === 'login') {
            this.handleLogin();
        } else if (contents && contents.length && contents[step]._id === 'register') {
            this.handleRegister();
        } else if (contents && contents.length && contents[step]._id === 'verify') {
            this.handleVerify();
        }
    };

    getButtonTitle = () => {
        const { step, contents } = this.state;
        if (contents && contents.length && contents[step].content) {
            if (contents[step]._id === 'login') {
                return 'ورود/ثبت نام';
            } else if (contents[step]._id === 'register') {
                return 'ثبت نام';
            } else if (contents[step]._id === 'verify') {
                return 'تایید';
            }
        }
    };

    componentDidMount() {
        const { setUserMobile, } = this.props;
        const contents = [];
        contents.push({
            title: 'ورود',
            content: <Login setUserMobile={setUserMobile} />,
            _id: 'login'
        });
        this.setState({
            contents
        });
    }

    render() {
        const { toggleAuthModal } = this.props;
        const { step, contents } = this.state;
        return (
            <Modal
                visible={this.props.showModal}
                className={styles.modal}
                footer={null}
                closable={false}
            >
                <div className={styles.modalWrapper}>
                    {
                        contents && contents.length && contents[step].content
                    }
                    <button className={styles.closeButton} onClick={toggleAuthModal}>X</button>
                    <div className={styles.footer}>
                        <div className={styles.buttonWrapper}>
                            <Button onClick={this.handleClick} type="primary">{this.getButtonTitle()}</Button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
