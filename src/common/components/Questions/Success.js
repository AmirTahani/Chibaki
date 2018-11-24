import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GetApp from '../GetApp/GetApp';
import styles from './Success.module.styl';

export default class Success extends Component {
    static propTypes = {
        onEnter: PropTypes.func.isRequired
    }

    onKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.props.onEnter();
        }
    };

    render() {
        return (
            <div onKeyDown={this.onKeyDown}>
                <p className={styles.description}>
                    درخواست شما با موفقیت ثبت شد. تا ساعتی دیگر از طرف متخصصین پیشنهاد قیمت دریافت میکنید.
                    <GetApp />
                </p>
            </div>
        );
    }
}
