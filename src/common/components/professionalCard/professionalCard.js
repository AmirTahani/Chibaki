import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Tooltip, Rate } from 'antd';
import styles from './professionalCard.style.module.styl';

class ProfessionalCard extends PureComponent {
    static propTypes = {
        professional: PropTypes.objectOf(PropTypes.any).isRequired,
    };

    getSrc = (professional) => {
        if (this.exist(professional, 'trust.profilePicture.filePath')) {
            return `https://chibaki.ir${professional.trust.profilePicture.filePath.replace('public', '')}`;
        }
        return '/assets/images/avatar.svg';
    };

    calculateNotRated = () => {
        const { professional } = this.props;
        if (professional.trust && professional.trust.amount) {
            if (professional.trust.amount >= 80) {
                return 4.5;
            }
            if (professional.trust.amount >= 50 && professional.trust.amount < 80) {
                return 4;
            }
            if (professional.trust.amount >= 30 && professional.trust.amount < 50) {
                return 3.5;
            }
        }
        return 3;
    };

    render() {
        const { professional } = this.props;
        return (
            <Link
                to={`/professional/${professional.firstname.replace(' ', '_')}_${professional.lastname.replace(' ', '_')}?id=${professional._id}${professional.profession ? `&profId=${professional.profession.profession}` : ''}`}
                className={styles.cardLink}
            >
                <div className={styles.card}>
                    <div className={styles.cardInner}>
                        <div className={styles.cardRight}>
                            <Row type="flex">
                                <Col span={24}>
                                    <img
                                        src={this.getSrc(professional)}
                                        alt={`${professional.firstname} ${professional.lastname}`}
                                        className={styles.avatar}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div className={styles.cardName}>
                                        {`${professional.firstname} ${professional.lastname}`}
                                    </div>
                                    <div className={styles.cardRate}>

                                        {
                                            this.exist(professional, 'profession.rate') > 0 ?
                                                <Rate
                                                    disabled
                                                    allowHalf
                                                    defaultValue={(Math.round(professional.profession.rate * 2)) / 2}
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
                                {professional.profession && professional.profession.intro && professional.profession.intro.description}
                            </div>
                            <Row>
                                <Col>
                                    <div className={styles.cardLeftBottom}>
                                        <div>
                                            <div className={styles.badgeWrapper}>
                                                <div
                                                    className={`${styles.badge}
                                                                            ${professional.trust &&
                                                    professional.trust.addressProof &&
                                                    professional.trust.addressProof.verified &&
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
                                                                            ${professional.trust &&
                                                    professional.trust.idCard &&
                                                    professional.trust.idCard.verified &&
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
                                                    className={`
                                                    ${styles.badge}
                                                    ${this.exist(professional, 'trust.certificate.verified') ? styles.badgeActive : ''}`}
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
                                       ${professional.trust &&
                                                    professional.trust.identity &&
                                                    professional.trust.identity.verified &&
                                                    professional.trust.identity.filePath &&
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
                                                    className={`
                                                    ${styles.badge}
                                                    ${this.exist(professional, 'trust.backgroundCheck.verified') ? styles.badgeActive : ''}`}
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
