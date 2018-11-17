import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import persian from 'persianjs';
import styles from './Login.module.styl';

export default class Login extends Component {
    static propTypes = {
        setUserMobile: PropTypes.func.isRequired,
        mobile: PropTypes.string.isRequired
    };

    state = {
        value: ''
    };

    onChangeMobile = (e) => {
        const value = e.target.value ? persian(e.target.value).toEnglishNumber().toString() : '';
        this.setState({
            value
        });
        this.props.setUserMobile(value);
    };

    componentDidMount() {
        if (this.props.mobile) {
            this.setState({
                value: this.props.mobile
            });
        }
    }

    render() {
        return (
            <div>
                <div className={styles.inputWrapper}>
                    <Input
                        placeholder="لطفا شماره خود را وارد کنید."
                        onChange={this.onChangeMobile}
                        value={this.state.value}
                    />
                </div>
            </div>
        );
    }
}
