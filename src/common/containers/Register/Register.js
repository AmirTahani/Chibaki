import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, RadioGroup, Checkbox } from 'antd';
import AutoComplete from '../../components/Kit/AutoComplete/AutoComplete';
import Loader from '../../components/Kit/Loader/Loader';

class Register extends Component {
    static propTypes = {
        agreement: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <div className={styles.wrapper}>
                <form className={styles.content}>
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
                                <label className={styles.fieldLabel} htmlFor="registerGender">جنسیت</label>
                                <RadioGroup
                                    options={this.genderOptions}
                                    onChange={this.onChangeGender}
                                    value={this.state.gender}
                                    required
                                />
                            </div>
                            {
                                showAutoComplete ? (
                                    <div className={`${styles.inputWrapper} ${styles.autocomplete}`}>
                                        <label className={styles.fieldLabel} htmlFor="registerAutocomplete">
تخصص خود را انتخاب
                            کنید:
                                        </label>
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
                                    </div>
                                ) : null
                            }
                            <div className={styles.inputWrapper}>
                                <Checkbox
                                    checked={agreement}
                                    onChange={this.handleAgreementChange}
                                    required
                                >
                                    <Link to="tos" onClick={this.handleAgreementLink}>قوانین و مقررات</Link>
                                    {' '}
سایت را خوانده و با آن موافقم
                                </Checkbox>
                            </div>
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

export default connect(
    mapStateToProps,
// Implement map dispatch to props
)(Register);
