import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import persian from 'persianjs';
import styles from './Login.module.styl';

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
        const value = e.target.value ? persian(e.target.value).toEnglishNumber().toString() : '';
        this.setState({
            value
        });
        this.props.setUserMobile(value);
    };

    onFieldFocus = () => {
        this.setState({
            focusInput: true
        });
    }

    onFieldBlur = () => {
        this.setState({
            focusInput: false
        });
    }

    componentDidMount() {
        if (this.props.mobile) {
            this.setState({
                value: this.props.mobile
            });
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
                    id="field"
                    placeholder="مثال: 09123456789"
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
