import React, { Component } from 'react';
import styles from './GetApp.module.styl';

export default class GetApp extends Component {
    render() {
        return (
            <div>
                <div className={styles.wrapper} id="get-app">
                    <div>
                        <h2 className="c-section__heading">دریافت اپلیکیشن</h2>
                    </div>
                    <div className="u-t--c">
                        <h3 className={styles.badge}>
                            <a
                                href="https://play.google.com/store/apps/details?id=com.jopp&utm_source=Website&utm_campaign=Landing&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
                            >
                                <img alt="در Google Play دریافت کنید" src="/assets/images/app/google-play.svg" />
                            </a>
                        </h3>
                        <h3 className={styles.badge}>
                            <a
                                href="https://new.sibapp.com/applications/Chibaki"
                            >
                                <img
                                    src="/assets/images/app/sibapp.png"
                                    alt="دانلود اپلیکیشن آی‌او‌اس از سیب اپ"
                                />
                            </a>
                        </h3>
                        <h3 className={styles.badge}>
                            <a
                                href="https://cafebazaar.ir/app/com.jopp/?l=fa"
                            >
                                <img
                                    src="/assets/images/app/cafebazaar.png"
                                    alt="دانلود اپلیکیشن اندروید از کافه بازار"
                                />
                            </a>
                        </h3>
                        <h3 className={styles.badge}>
                            <a href="https://bit.ly/2IR8id2">
                                <img
                                    src="/assets/images/app/direct.svg"
                                    alt="دانلود اپلیکیشن اندروید با لینک مستقیم"
                                />
                            </a>
                        </h3>
                    </div>
                </div>
            </div>
        );
    }
}
