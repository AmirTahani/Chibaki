import React, { Component } from 'react';
import styles from './Success.module.css';

export default class Success extends Component {
    render() {
        return (
            <p className={styles.description}>
                درخواست شما با موفقیت ثبت شد. تا ساعتی دیگر از طرف متخصصین پیشنهاد قیمت دریافت میکنید.
            </p>
        );
    }
}
