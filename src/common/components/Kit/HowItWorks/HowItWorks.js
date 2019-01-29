import { Col, Row } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './HowItWorks.styl';
import '../../../styles/section.styl';
import styles from './HowItWorks.module.styl';

export default class HowItWorks extends Component {
    static propTypes = {
        shouldShowChibakiSection: PropTypes.bool.isRequired
    };

    render() {
        const { shouldShowChibakiSection } = this.props;
        return (
            <div style={!shouldShowChibakiSection ? { display: 'none' } : {}}>
                <div className="l-container l-container--md">
                    <div className="c-howitworks">
                        <div>
                            <div>
                                <h4 className="c-section__heading">چی باکی چگونه کار می کند</h4>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <div className="c-howitworks__item">
                                    <div className="c-howitworks__icon">
                                        <i className="icon-circle icon--back" />
                                        <i className="icon-checklist icon--front" />
                                    </div>
                                    <div className="c-howitworks__text">
                                        <div className="c-howitworks__title">ثبت رایگان درخواست</div>
                                        <div className="c-howitworks__desc">
                                            در ابتدا مشخص کنید به چه متخصصی نیاز دارید و به سوالات ما پاسخ دهید
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.col}>
                                <div className="c-howitworks__item">
                                    <div className="c-howitworks__icon">
                                        <i className="icon-circle icon--back" />
                                        <i className="icon-people icon--front" />
                                    </div>
                                    <div className="c-howitworks__text">
                                        <div className="c-howitworks__title">بررسی و مقایسه</div>
                                        <div className="c-howitworks__desc">
                                            در عرض چند ساعت چندین پیشنهاد قیمت از متخصصین دریافت می کنید
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.col}>
                                <div className="c-howitworks__item">
                                    <div className="c-howitworks__icon">
                                        <i className="icon-circle icon--back" />
                                        <i className="icon-check icon--front" />
                                    </div>
                                    <div className="c-howitworks__text">
                                        <div className="c-howitworks__title">انتخاب</div>
                                        <div className="c-howitworks__desc">
                                            پس از بررسی قیمت, پروفایل, درصد اطمینان و ... , فرد مناسب را انتخاب کنید
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
