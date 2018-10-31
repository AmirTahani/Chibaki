import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Row, Col, Tooltip, Button, Rate, Spin } from 'antd';
import styles from './professionalCard.style.module.styl';

class ProfessionalCard extends PureComponent {
    static propTypes = {
        item: PropTypes.objectOf(PropTypes.any).isRequired,
    };

    getSrc = (item) => {
        if (this.exist(item, 'trust.profilePicture.filePath')) {
            return `https://chibaki.ir${item.trust.profilePicture.filePath.replace('public', '')}`;
        }
        return 'https://chibaki.ir/profile/images/avatar.svg';
    };

    calculateNotRated = () => {
        const { item } = this.props;
        if (item.trust && item.trust.amount) {
            if (item.trust.amount >= 80) {
                return 4.5;
            }
            if (item.trust.amount >= 50 && item.trust.amount < 80) {
                return 4;
            }
            if (item.trust.amount >= 30 && item.trust.amount < 50) {
                return 3.5;
            }
        }
        return 3;
    };

    render() {
        const { item } = this.props;
        console.log((Math.round(item.profession.rate * 2) / 2));
        return (
            <Link
                to={`/professional/${item.firstname.replace(' ', '_')}_${item.lastname.replace(' ', '_')}?id=${item._id}`}
                className={styles.cardLink}
            >
                <div className={styles.card}>
                    <div className={styles.cardInner}>
                        <div className={styles.cardRight}>
                            <Row type="flex">
                                <Col span={24}>
                                    <img
                                        src={this.getSrc(item)}
                                        alt={`${item.firstname} ${item.lastname}`}
                                        className={styles.avatar}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div className={styles.cardName}>
                                        {`${item.firstname} ${item.lastname}`}
                                    </div>
                                    <div className={styles.cardRate}>

                                        {this.exist(item, 'profession.rate')
                                            ? <Rate
                                                disabled
                                                allowHalf
                                                defaultValue={(Math.round(item.profession.rate * 2) / 2)}
                                            />
                                            : <Rate
                                                disabled
                                                allowHalf
                                                defaultValue={this.calculateNotRated()}
                                            />
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className={styles.cardLeft}>
                            <div className={styles.cardDesc}>
                                {item.profession && item.profession.intro && item.profession.intro.description}
                            </div>
                            <Row>
                                <Col>
                                    <div className={styles.cardLeftBottom}>
                                        <div>
                                            <div className={styles.badgeWrapper}>
                                                <div
                                                    className={`${styles.badge}
                                                                            ${item.trust &&
                                                    item.trust.addressProof &&
                                                    item.trust.addressProof.verified &&
                                                    styles.badgeActive}`}
                                                >
                                                    <Row>
                                                        <Col span={24}>
                                                            <Tooltip title="آدرس">
                                                                <img
                                                                    src="/assets/images/badge/address.svg"
                                                                    alt="آدرس"
                                                                    className={styles.badgeImg}
                                                                />
                                                            </Tooltip>
                                                        </Col>
                                                        <Col span={24}>
                                                            <div
                                                                className={styles.badgeText}
                                                            >
                                                                آدرس
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div
                                                    className={`${styles.badge}
                                                                            ${item.trust &&
                                                    item.trust.idCard &&
                                                    item.trust.idCard.verified &&
                                                    styles.badgeActive}`}
                                                >
                                                    <Row>
                                                        <Col span={24}>
                                                            <Tooltip title="کارت ملی">
                                                                <img
                                                                    src="/assets/images/badge/idCard.svg"
                                                                    alt="کارت ملی"
                                                                    className={styles.badgeImg}
                                                                />
                                                            </Tooltip>
                                                        </Col>
                                                        <Col span={24}>
                                                            <div
                                                                className={styles.badgeText}
                                                            >
                                                                کارت ملی
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div
                                                    className={`${styles.badge}
                                        ${item.trust && item.trust.certificate && item.trust.certificate.verified && styles.badgeActive}`}
                                                >
                                                    <Row>
                                                        <Col span="24">
                                                            <Tooltip
                                                                title="مدرک تحصیلی"
                                                            >
                                                                <img
                                                                    src="/assets/images/badge/degree.svg"
                                                                    alt="مدرک تحصیلی"
                                                                    className={styles.badgeImg}
                                                                />
                                                            </Tooltip>
                                                        </Col>
                                                        <Col span="24">
                                                            <div
                                                                className={styles.badgeText}
                                                            >
                                                                مدرک تحصیلی
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div
                                                    className={`${styles.badge}
                                       ${item.trust &&
                                                    item.trust.identity &&
                                                    item.trust.identity.verified &&
                                                    item.trust.identity.filePath &&
                                                    styles.badgeActive}`}
                                                >
                                                    <Row>
                                                        <Col span="24">
                                                            <Tooltip title="تایید هویت">
                                                                <img
                                                                    src="/assets/images/badge/identity.svg"
                                                                    alt="تایید هویت"
                                                                    className={styles.badgeImg}
                                                                />
                                                            </Tooltip>
                                                        </Col>
                                                        <Col span={24}>
                                                            <div
                                                                className={styles.badgeText}
                                                            >
                                                                تایید هویت
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div
                                                    span={24}
                                                    className={`${styles.badge}
                                        ${item.trust && item.trust.backgroundCheck && item.trust.backgroundCheck.verified && styles.badgeActive}`}
                                                >
                                                    <Row>
                                                        <Col span={24}>
                                                            <Tooltip
                                                                title="گواهی عدم سو پیشینه"
                                                            >
                                                                <img
                                                                    src="/assets/images/badge/backgroundcheck.svg"
                                                                    alt="گواهی عدم سو پیشینه"
                                                                    className={styles.badgeImg}
                                                                />
                                                            </Tooltip>
                                                        </Col>
                                                        <Col span={24}>
                                                            <div
                                                                className={styles.badgeText}
                                                            >
                                                                گواهی عدم سوء‌پیشینه
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button className={styles.cardBtn}>
                                                مشاهده پروفایل
                                            </button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

export default ProfessionalCard;
