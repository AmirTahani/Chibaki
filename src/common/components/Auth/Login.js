import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
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
        this.setState({
            value: e.target.value
        });
        this.props.setUserMobile(e.target.value);
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
