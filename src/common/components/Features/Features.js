import React, { Component } from 'react';
import { Row, Col } from 'antd';
import styles from './Features.module.styl';

export default class Features extends Component {
    render() {
        return (
            <div>
                <div className="c-section__heading">
                    چرا چی باکی؟
                </div>
                <div className={styles.features} id="features">
                    <div className="l-container">
                        <div className={styles.features__grid}>
                            <Row type="flex">
                                <Col span={24} md={12} className={styles.features__col}>
                                    <div className={styles.features__item}>
                                        <span className={styles.features__text}>
                                            <h3>ثبت رایگان درخواست</h3>
                                        </span>
                                    </div>
                                    <div className={styles.features__item}>
                                        <span
                                            className={styles.features__text}
                                        >
                                            <h3>انتخاب متخصص مناسب با شرایط شما</h3>
                                        </span>
                                    </div>
                                    <div className={styles.features__item}>
                                        <span
                                            className={styles.features__text}
                                        >
                                            <h3>قیمت دهی بر اساس خواسته دقیق شما</h3>
                                        </span>
                                    </div>
                                </Col>
                                <Col span={24} md={12} className={styles.features__col}>
                                    <div className={styles.features__item}>
                                        <span className={styles.features__text}>
                                            <h3>بدون گرفتن کمیسیون</h3>
                                        </span>
                                    </div>
                                    <div className={styles.features__item}>
                                        <span
                                            className={styles.features__text}
                                        ><h3>ارزیابی عملکرد و رتبه بندی متخصصین</h3></span>
                                    </div>
                                    <div className={styles.features__item}>
                                        <span
                                            className={styles.features__text}
                                        ><h3>امکان مذاکره و ارتباط مستقیم با متخصصین</h3></span>
                                    </div>
                                </Col>
                            </Row>
                            <div className={styles.phone}>
                                <img src="/assets/images/phone.png" alt="Chibaki app - اپلیکیشن چی باکی" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
