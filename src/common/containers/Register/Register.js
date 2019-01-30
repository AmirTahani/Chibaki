import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Checkbox, Input, Radio, Tabs, message } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AutoComplete from '../../components/Kit/AutoComplete/AutoComplete';
import Loader from '../../components/Kit/Loader/Loader';
import {
    register,
    toggleAuthModal,
    setUserName,
    setUserLastName,
    setUserGender
} from '../../redux/modules/auth';
import styles from './Register.module.styl';
import { persianRegex, toPersianChar } from '../../utils/persian';

const RadioGroup = Radio.Group;

class Register extends Component {
    static propTypes = {
        professions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        gender: PropTypes.string.isRequired,
        setUserLastNameConnect: PropTypes.func.isRequired,
        setUserNameConnect: PropTypes.func.isRequired,
        setUserGenderConnect: PropTypes.func.isRequired,
        registerConnect: PropTypes.func.isRequired,
        toggleAuthModalConnect: PropTypes.func.isRequired,
        registering: PropTypes.bool.isRequired,
        mobile: PropTypes.string.isRequired
    };

    state = {
        role: 'proficient',
        firstName: '',
        lastName: '',
        gender: this.props.gender,
        professionId: ''
    }

    genderOptions = [
        { label: 'مرد', value: 'male', required: true },
        { label: 'زن', value: 'female', required: true }
    ]

    onChangeGender = (e) => {
        this.setState({
            gender: e.target.value
        });
        this.props.setUserGenderConnect(e.target.value);
    };

    onTabChange = (role) => {
        this.setState({
            role
        });
    };

    onChangeName = (e) => {
        const firstName = toPersianChar(e.target.value).trim();
        this.setState({
            firstName
        });
        this.validateInput({
            label: 'نام',
            input: e.target,
            text: firstName
        });
    };

    onChangeLastName = (e) => {
        const lastName = toPersianChar(e.target.value).trim();
        this.setState({
            lastName
        });
        this.validateInput({
            label: 'نام خانوادگی',
            input: e.target,
            text: lastName
        });
    };

    validateInput = ({ text, input, label }) => {
        const persianRegexp = new RegExp(persianRegex);
        ReactDOM.findDOMNode(input).setCustomValidity(
            !text || !persianRegexp.test(text)
                ?
                `لطفا ${label} را 
                ${!persianRegexp.test(text) ? 'فارسی' : ''}
                وارد کنید`
                :
                ''
        );
    }

    handleAgreementChange = (e) => {
        const { checked } = e.target;

        ReactDOM.findDOMNode(this.agreementRef).setCustomValidity(!checked ? 'لطفا قوانین و مقررات را تایید کنید!' : '');

        this.setState({
            agreement: checked
        });
    }

    handleAgreementLink = () => {
        this.props.toggleAuthModalConnect();
    }

    handleProfessionSelect = (professionId) => {
        this.setState({
            professionId
        });
    };

    handleFormSubmit = (event) => {
        event && event.preventDefault();

        // const { firstName, lastName, mobile, gender } = this.props;
        const { mobile } = this.props;
        const {
            role,
            professionId,
            agreement,
            gender,
            firstName,
            lastName
        } = this.state;

        if (role === 'proficient' && !professionId) {
            return message.error('لطفا تخصص خود را انتخاب کنید!');
        }

        new Promise((resolve, reject) => {
            this.props.registerConnect({ firstName, lastName, mobile, professionId, gender }, resolve, reject);
        }).then(() => {
            if (typeof window !== 'undefined') {
                window.location.href = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/pages`;
            }
        });
    }

    renderRegisterForm = (showAutoComplete, role) => {
        const { professions } = this.props;
        const { agreement } = this.state;

        return (
            <form
                onSubmit={this.handleFormSubmit}
                name={`${role}Form`}
                id={`${role}Form`}
            >
                <div className={styles.inputWrapper}>
                    <label className={styles.fieldLabel} htmlFor="registerFirstName">نام (فارسی)</label>
                    <Input
                        className={styles.input}
                        placeholder="مثال: علی"
                        pattern={persianRegex}
                        name={`registerFirstName${role}`}
                        onChange={this.onChangeName}
                        value={this.state.firstName}
                        onFocus={this.onChangeName}
                        required
                        autoFocus
                        ref={(c) => {
                            this.firstNameRef = c;
                        }}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.fieldLabel} htmlFor="registerLastName">نام خانوادگی (فارسی)</label>
                    <Input
                        required
                        className={styles.input}
                        placeholder="مثال: محمدی"
                        pattern={persianRegex}
                        name={`registerLastName${role}`}
                        onChange={this.onChangeLastName}
                        value={this.state.lastName}
                        ref={(c) => {
                            this.lastNameRef = c;
                        }}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.fieldLabel} htmlFor="registerGender">جنسیت</label>
                    <RadioGroup
                        options={this.genderOptions}
                        onChange={this.onChangeGender}
                        value={this.state.gender}
                        required
                    />
                </div>
                {
                    showAutoComplete ? <div className={`${styles.inputWrapper} ${styles.autocomplete}`}>
                        <label className={styles.fieldLabel} htmlFor="registerAutocomplete">تخصص خود را انتخاب
                            کنید:</label>
                        <AutoComplete
                            options={professions}
                            showBtn={false}
                            placeholder="مثال: طراحی گرافیک"
                            onSubmit={this.handleProfessionSelect}
                            className={styles.autocompleteForm}
                            wrapInForm={false}
                        >
                            <Input
                                required
                                name="registerAutocomplete"
                                className={styles.input}
                                type="text"
                            />
                        </AutoComplete>
                    </div> : null
                }
                <div className={styles.inputWrapper}>
                    <label htmlFor="registerAgreement">
                        <input
                            type="checkbox"
                            id="registerAgreement"
                            name="registerAgreement"
                            className={styles.checkboxInput}
                            checked={agreement}
                            onChange={this.handleAgreementChange}
                            required
                            ref={(c) => {
                                this.agreementRef = c;
                            }}
                        />
                        <Link to="tos">قوانین و مقررات</Link> سایت را خوانده و با آن موافقم
                    </label>
                </div>
            </form>
        );
    };

    componentWillMount() {
        this.event({
            category: 'user',
            action: 'INSIDE_REGISTER',
            label: 'user visited register page'
        });
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.firstNameRef).setCustomValidity('لطفا نام را وارد کنید!');
        ReactDOM.findDOMNode(this.lastNameRef).setCustomValidity('لطفا نام خانوادگی را وارد کنید!');
        ReactDOM.findDOMNode(this.agreementRef).setCustomValidity('لطفا قوانین و مقررات را تایید کنید!');
        message.config({
            maxCount: 1
        });
    }

    render() {
        const { role } = this.state;
        const { registering } = this.props;

        return (
            <div className={styles.wrapper}>
                <div
                    className={styles.content}
                >
                    <div className={styles.header}>
                        <h1>
                            <Link
                                to="/"
                                className={styles.logo}
                            >
                                <img
                                    src="/assets/images/logo/logo-text.svg"
                                    alt="چی باکی - Chibaki"
                                    className={styles.logoImg}
                                />
                            </Link>
                        </h1>
                    </div>
                    <div className={styles.body}>
                        <Tabs defaultActiveKey="proficient" onChange={this.onTabChange}>
                            <Tabs.TabPane
                                tab={<span className={styles.tabTitle}>ثبت نام متخصص</span>}
                                key="proficient"
                            >
                                {
                                    role === 'proficient' && this.renderRegisterForm(true, 'proficient')
                                }
                            </Tabs.TabPane>
                            <Tabs.TabPane
                                tab={<span className={styles.tabTitle}> ثبت نام مشتری</span>}
                                key="customer"
                            >
                                {
                                    role === 'customer' && this.renderRegisterForm(false, 'customer')
                                }
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.btnWrapper}>
                            <button
                                className={`${styles.btnSubmit} c-btn c-btn--lg c-btn--primary`}
                                type="submit"
                                form={`${role}Form`}
                                disabled={registering}
                            >
                                <div className={`${styles.btnInner} ${registering ? styles.btnInnerLoading : ''}`}>
                                    {registering ? (
                                        <Loader
                                            customWrapperClass={styles.btnLoader}
                                            customDotClass={styles.btnLoaderDot}
                                        />
                                    ) : 'ثبت نام'}
                                </div>
                            </button>
                            <button
                                className={`${styles.btnBack} c-btn`}
                                onClick={this.handleGoBack}
                                type="button"
                            >
                                <div className={`${styles.btnInner}`}>
                                    <span>بازگشت</span>
                                    <span className={`icon-back ${styles.btnBackIcon}`} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    professions: state.professions.professions,
    gender: state.auth.gender,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    agreement: state.auth.agreement,
    registering: state.auth.registering,
    mobile: state.auth.mobile
}), {
    registerConnect: register,
    setUserNameConnect: setUserName,
    setUserLastNameConnect: setUserLastName,
    setUserGenderConnect: setUserGender,
    toggleAuthModalConnect: toggleAuthModal
})(Register);
