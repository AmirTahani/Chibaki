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
        value: ''
    };

    componentDidMount() {
        if (this.props.mobile) {
            this.setState({
                value: this.props.mobile
            });
        }
    }

    onChangeMobile = (e) => {
        const value = toEnglishNumber(e.target.value);

        this.setState({
            value
        });

        this.props.setUserMobile(e.target.value);

        this.validateInput(value);
    };

    validateInput = (value = this.state.value) => {
        if (!value) {
            ReactDom.findDOMNode(this.inputRef).setCustomValidity('لطفا شماره موبایل را وارد کنید!');
        } else if (ReactDom.findDOMNode(this.inputRef).validity.patternMismatch) {
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
                        value={this.state.value}
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
