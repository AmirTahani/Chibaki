import React, { Component } from 'react';
import styles from './ContacUS.module.styl';

export default class Contact extends Component {
    render() {
        return (
            <div>
                <div className="hero">
                    <div className="heroBg">
                        <img
                            src="/assets/images/hero/contact.jpeg"
                            alt="Chibaki Team"
                        />
                    </div>
                    <div className="heroContent">
                        <h1 className="heroTitle">
                            با ما در تماس باشید
                        </h1>
                    </div>
                </div>

                <div className="-bg-pattern -bg-pattern--dark-blue">
                    <div className={styles.container}>
                        <div className={styles.card}>

                            <div className={styles.row}>
                                <div className={styles.label}>
                                    شماره تماس:
                                </div>
                                <div className={styles.text} dir="ltr"><a href="tel:+982191072580">(۰۲۱) ۹۱۰۷ ۲۵۸۰</a>
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.label}>
                                    آدرس:
                                </div>
                                <div className={styles.text}>مرزداران - خیابان ابراهیمی - برج الوند - ط ۱۱ جنوبی - و
                                    ۱۱۰۵
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.label}>
                                    پست الکترونیکی:
                                </div>
                                <div className={styles.text}>info@chibaki.ir</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
