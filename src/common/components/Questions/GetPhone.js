import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import styles from './GetPhone.module.styl';

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

    onKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.props.onEnter();
        }
    };

    componentDidMount() {
        if (this.props.mobile) {
            this.setState({
                value: this.props.mobile
            });
        }
    }

    onChangeMobile = (e) => {
        this.setState({
            value: e.target.value
        });
        this.props.setUserMobile(e.target.value);
    };

    render() {
        const { question } = this.props;
        return (
            <div onKeyDown={this.onKeyDown}>
                <p className={styles.title}>{question.title}</p>
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
