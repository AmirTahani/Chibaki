import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Tabs, Input, Radio } from 'antd';
import PropTypes from 'prop-types';
import persianJs from 'persianjs';
import { AutoComplete } from '../Kit';
import styles from './Register.module.styl';
import { persianRegex } from '../../utils/persian';

export default class Register extends Component {
    static propTypes = {
        professions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        setUserLastName: PropTypes.func.isRequired,
        setUserName: PropTypes.func.isRequired,
        setUserGender: PropTypes.func.isRequired,
        selectProfession: PropTypes.func.isRequired,
        focusInput: PropTypes.bool,
        registerRole: PropTypes.string.isRequired,
        toggleRegisterRole: PropTypes.func.isRequired,
        submit: PropTypes.func.isRequired
    };

    static defaultProps = {
        focusInput: false
    };

    state = {
        focusInput: true,
        firstName: '',
        lastName: '',
        gender: ''
    };

    focusInput = () => {
        this.firstNameRef.focus();
    };

    onChangeGender = (e) => {
        console.log('radio2 checked', e.target.value);
        this.setState({ gender: e.target.value });
        this.props.setUserGender(e.target.value);
    };

    blurInput = () => {
        this.firstNameRef.blur();
    };

    onTabChange = (key) => {
        this.props.toggleRegisterRole(key);
        this.focusInput();
    };

    onChangeName = (e) => {
        this.setState({
            firstName: e.target.value ? persianJs(e.target.value).arabicChar().toString() : ''
        });
        if (e.target.validity.patternMismatch) {
            e.target.setCustomValidity('لطفا نام را پارسی وارد کنید!');
        } else if (!e.target.value || e.target.validity.valueMissing) {
            e.target.setCustomValidity('لطفا نام را وارد کنید!');
        } else {
            e.target.setCustomValidity('');
            this.props.setUserName(e.target.value);
        }
    };

    onChangeLastName = (e) => {
        this.setState({
            lastName: e.target.value ? persianJs(e.target.value).arabicChar().toString() : ''
        });
        if (e.target.validity.patternMismatch) {
            e.target.setCustomValidity('لطفا نام خانوادگی را پارسی وارد کنید!');
        } else if (!e.target.value || e.target.validity.valueMissing) {
            e.target.setCustomValidity('لطفا نام خانوادگی را وارد کنید!');
        } else {
            e.target.setCustomValidity('');
            this.props.setUserLastName(e.target.value);
        }
    };

    handleSelect = (professionId) => {
        this.props.selectProfession(professionId);
    };

    renderRegisterForm = (showAutoComplete, role) => {
        const { professions } = this.props;
        const RadioGroup = Radio.Group;
        const plainOptions = [
            { label: 'مرد', value: 'male' },
            { label: 'زن', value: 'female' },
        ];
        return (
            <div>
                <div className={styles.inputWrapper}>
                    <label className={styles.fieldLabel} htmlFor="registerFirstName">نام (فارسی)</label>
                    <Input
                        required
                        className={styles.input}
                        placeholder="مثال: علی"
                        pattern={persianRegex}
                        name={`registerFirstName${role}`}
                        onChange={this.onChangeName}
                        value={this.state.firstName}
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
                    <label className={styles.fieldLabel} htmlFor="registerLastName">جنسیت</label>
                    <RadioGroup options={plainOptions} onChange={this.onChangeGender} value={this.state.gender} />

                </div>
                {
                    showAutoComplete ? <div className={`${styles.inputWrapper} ${styles.autocomplete}`}>
                        <label className={styles.fieldLabel} htmlFor="registerAutocomplete">تخصص خود را انتخاب
                            کنید:</label>
                        <AutoComplete
                            options={professions}
                            showBtn={false}
                            placeholder="مثال: طراحی گرافیک"
                            onSubmit={this.handleSelect}
                            className={styles.autocompleteForm}
                            wrapInForm={false}
                        >
                            <Input
                                required
                                form="modalForm"
                                name="registerAutocomplete"
                                className={styles.input}
                                type="text"
                                onKeyDown={(e) => {
                                    if (e.keyCode === 13) {
                                        this.props.submit();
                                    }
                                }}
                                ref={(c) => {
                                    this.professionRef = c;
                                }}
                            />
                        </AutoComplete>
                    </div> : null
                }
            </div>
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
        this.focusInput();
        ReactDom.findDOMNode(this.firstNameRef).setCustomValidity('لطفا نام را وارد کنید!');
        ReactDom.findDOMNode(this.lastNameRef).setCustomValidity('لطفا نام خانوادگی را وارد کنید!');
    }

    componentDidUpdate(prevProps) {
        const { focusInput } = this.props;
        if (prevProps.focusInput !== focusInput && this.state.focusInput !== focusInput) {
            if (focusInput) {
                this.focusInput();
            } else {
                this.blurInput();
            }
        }
    }

    render() {
        const { focusInput, registerRole } = this.props;

        return (
            <div className={styles.wrapper}>
                <Tabs defaultActiveKey="proficient" onChange={this.onTabChange}>
                    <Tabs.TabPane
                        tab={<span className={styles.tabTitle}>ثبت نام متخصص</span>}
                        key="proficient"
                    >
                        {
                            registerRole === 'proficient' && this.renderRegisterForm(true, focusInput, 'proficient')
                        }
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab={<span className={styles.tabTitle}> ثبت نام مشتری</span>}
                        key="customer"
                    >
                        {
                            registerRole === 'customer' && this.renderRegisterForm(false, focusInput, 'customer')
                        }
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}
