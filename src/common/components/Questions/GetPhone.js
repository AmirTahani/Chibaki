import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import styles from './GetPhone.module.styl';
import { phoneNumberRegex, toEnglishNumber } from '../../utils/persian';

export default class GetPhone extends Component {
    static propTypes = {
        question: PropTypes.objectOf(PropTypes.any).isRequired,
        setUserMobile: PropTypes.func.isRequired,
        mobile: PropTypes.string.isRequired,
        onEnter: PropTypes.func.isRequired
    };

    state = {
        mobile: ''
    }

    onChangeMobile = (e) => {
        const mobile = toEnglishNumber(e.target.value);

        this.props.setUserMobile(mobile);

        this.setState({
            mobile
        });

        this.validateInput(mobile);
    };

    validateInput = (value) => {
        if (!value) {
            ReactDom.findDOMNode(this.inputRef).setCustomValidity('لطفا شماره موبایل را وارد کنید!');
        } else if (!phoneNumberRegex.test(value)) {
            ReactDom.findDOMNode(this.inputRef).setCustomValidity('لطفا شماره موبایل را به درستی وارد کنید!');
        } else {
            ReactDom.findDOMNode(this.inputRef).setCustomValidity('');
        }
    }

    render() {
        const { question } = this.props;
        return (
            <div>
                <p className={styles.title}>{question.title}</p>
                <div className={styles.inputWrapper}>
                    <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="لطفا شماره خود را وارد کنید."
                        onChange={this.onChangeMobile}
                        value={this.state.mobile}
                        pattern={phoneNumberRegex.toString().slice(1, -1)}
                        required
                        autoFocus
                        ref={(c) => {
                            this.inputRef = c;
                        }}
                    />
                </div>
            </div>
        );
    }
}
