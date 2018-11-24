import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GetApp from '../GetApp/GetApp';
import styles from './Success.module.styl';

export default class Success extends Component {
    static propTypes = {
        onEnter: PropTypes.func.isRequired
    };

    onKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.props.onEnter();
        }
    };

    render() {
        return (
            <div className={styles.component} autoFocus onKeyDown={this.onKeyDown} tabIndex={0}>
                <div>
                    <img
                        src="/assets/images/logo/logo-text.svg"
                        alt="Chibaki - چی باکی"
                        className={styles.logo}
                    />
                </div>
                <p className={styles.wrapper}>
                    <div className={styles.whiteBox}>
                        درخواست شما با موفقیت ثبت شد.
                    </div>
                    <div className={styles.desc}>
                        برای اطلاع از وضعیت درخواست خود و ارتباط با متخصصین، لطفا اپلیکیشن چی باکی را دانلود کنید.
                    </div>
                    <GetApp showDirect={false} layout={'row'} noText badgeClass={styles.badge} badgeWrapperClass={styles.badgeWrapper} />
                </p>
            </div>
        );
    }
}
