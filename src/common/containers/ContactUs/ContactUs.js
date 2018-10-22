import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Contact.module.styl';

export default class Contact extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="hero">
                    <div className="heroBg">
                        <img
                            src="https://chibaki.ir/assets/images/about/hero.jpg"
                            alt="Chibaki Team"
                        />
                    </div>
                    <div className="heroContent">
                        <div className="heroTitle">
                            با ما در تماس باشید
                        </div>
                    </div>
                </div>

                <div className="l-container">
                    <div className={styles.card}>

                        <div className={styles.row}>
                            <div className={styles.label}>
                                <i className="fa fa-phone fa-fw fa-lg" /> شماره تماس:
                            </div>
                            <div className={styles.text} dir="ltr"><a href="tel:+982191072580">(۰۲۱) ۹۱۰۷ ۲۵۸۰</a>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.label}>
                                <i className="fa fa-map-marker fa-fw fa-lg" /> آدرس:
                            </div>
                            <div className={styles.text}>مرزداران - خیابان ابراهیمی - برج الوند - ط ۱۱ جنوبی - و
                                ۱۱۰۵
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.label}>
                                <i className="fa fa-envelope-o fa-fw fa-lg" /> پست الکترونیکی:
                            </div>
                            <div className={styles.text}>info@chibaki.ir</div>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
