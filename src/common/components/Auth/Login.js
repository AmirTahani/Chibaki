import ReactDom from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import persian from 'persianjs';
import styles from './Login.module.styl';
import { phoneNumberRegex, toEnglishNumber } from '../../utils/persian';

export default class Login extends Component {
    static propTypes = {
        setUserMobile: PropTypes.func.isRequired,
        mobile: PropTypes.string.isRequired,
        focusInput: PropTypes.bool
    };

    static defaultProps = {
        focusInput: false
    };

    state = {
        value: '',
        focusInput: true
    };

    onChangeMobile = (e) => {
        const value = toEnglishNumber(e.target.value);

        this.setState({
            value
        }, () => {
            if (this.validateInput(value)) {
                this.props.setUserMobile(value);
            }
        });
    };

    onFieldFocus = () => {
        this.setState({
            focusInput: true
        });
    };

    onFieldBlur = () => {
        this.setState({
            focusInput: false
        });
    };

    validateInput = (value = this.state.value) => {
        if (!value) {
            ReactDom.findDOMNode(this.inputRef).setCustomValidity('لطفا شماره موبایل را وارد کنید!');
            return false;
        } else if (ReactDom.findDOMNode(this.inputRef).validity.patternMismatch) {
            ReactDom.findDOMNode(this.inputRef).setCustomValidity('لطفا شماره موبایل را به درستی وارد کنید!');
            return false;
        }
        ReactDom.findDOMNode(this.inputRef).setCustomValidity('');
        return true;
    };

    componentDidMount() {
        if (this.props.mobile) {
            this.setState({
                value: this.props.mobile
            }, () => this.validateInput(this.props.mobile));
        } else {
            this.validateInput(this.props.mobile);
        }

        this.inputRef.focus();
    }

    componentDidUpdate(prevProps) {
        const { focusInput } = this.props;
        if (prevProps.focusInput !== focusInput && this.state.focusInput !== focusInput) {
            if (focusInput) {
                this.inputRef.focus();
            } else {
                this.inputRef.blur();
            }
        }
    }

    render() {
        return (
            <div className={styles.inputWrapper}>
                <label htmlFor="field" className={styles.fieldLabel}>
                    لطفا شماره موبایل خود را وارد کنید:
                </label>
                <Input
                    name="field"
                    type="text"
                    inputMode="numeric"
                    id="field"
                    placeholder="مثال: 09123456789"
                    required
                    pattern={phoneNumberRegex.toString().slice(1, -1)}
                    autoFocus
                    className={styles.input}
                    onChange={this.onChangeMobile}
                    onBlur={this.onFieldBlur}
                    onFocus={this.onFieldFocus}
                    value={this.state.value}
                    ref={(c) => {
                        this.inputRef = c;
                    }}
                />
            </div>
        );
    }
}
