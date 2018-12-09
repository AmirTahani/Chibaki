import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import styles from './Footer.module.styl';

export default function Footer() {
    return (
        <footer>
            <div className={styles.footerInner}>
                <Row
                    type="flex"
                    align="middle"
                >
                    <Col
                        md={{
                            span: 8,
                            order: 1
                        }}
                        span={24}
                        order={2}
                    >
                        <Row
                            type="flex"
                            align="middle"
                            justify="center"
                            gutter={15}
                            className={styles.removeMargin}
                        >
                            <Col>
                                <Link className={styles.footerLink} to={encodeURI('/تماس_با_ما')}>
                                    تماس با ما
                                </Link>
                                <Link className={styles.footerLink} to={encodeURI('/درباره_ما')}>
                                    درباره ما
                                </Link>
                            </Col>
                            <Col>
                                <a
                                    href="https://www.instagram.com/chibaki.ir/"
                                    className={styles.iconLink}
                                    rel="nofollow noopener noreferrer"
                                    target="_blank"
                                >
                                    <i className="icon-instagram" />
                                </a>
                                <a
                                    href="https://t.me/chibaki_ir"
                                    className={styles.iconLink}
                                    rel="nofollow noopener noreferrer"
                                    target="_blank"
                                >
                                    <i className="icon-telegram" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/jopp-ir/"
                                    className={styles.iconLink}
                                    rel="nofollow noopener noreferrer"
                                    target="_blank"
                                >
                                    <i className="icon-linkedin" />
                                </a>
                                <a
                                    href="https://twitter.com/chibaki_ir"
                                    className={styles.iconLink}
                                    rel="nofollow noopener noreferrer"
                                    target="_blank"
                                >
                                    <i className="icon-twitter" />
                                </a>
                            </Col>
                        </Row>
                    </Col>
                    <Col
                        md={{
                            span: 8,
                            order: 2
                        }}
                        span={24}
                        order={3}
                    >
                        <div className={styles.copyRight}>
                            <div>
                                <Link to="/">
                                    <img
                                        className={styles.logo}
                                        src="/assets/images/logo/logo-1-1.svg"
                                        alt="Chibaki - چی‌باکی"
                                    />
                                </Link>
                            </div>
                            <span
                                className={styles.copyRightText}
                            >
                                    تمامی حقوق
                                    متعلق به
                                    وبسایت چی‌باکی
                                    می باشد
                            </span>
                        </div>
                    </Col>
                    <Col
                        md={{
                            span: 8,
                            order: 3
                        }}
                        span={24}
                        order={1}
                    >
                        {/* Badges */}
                        <div />
                        <div />
                    </Col>
                </Row>
            </div>
        </footer>
    );
}
