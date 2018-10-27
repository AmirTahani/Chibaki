import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import styles from './Verify.module.styl';

export default class Verify extends Component {
    static propTypes = {
        setUserCode: PropTypes.func.isRequired
    };

    state = {
        value: ''
    };

    onChangeCode = (e) => {
        this.setState({
            value: e.target.value
        });
        this.props.setUserCode(e.target.value);
    };

    render() {
        return (
            <div>
                <div className={styles.inputWrapper}>
                    <Input
                        placeholder="لطفا کد را وارد کنید."
                        onChange={this.onChangeCode}
                        value={this.state.value}
                    />
                </div>
            </div>
        );
    }
}
