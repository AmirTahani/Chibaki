import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Row, Col, Tooltip, Button } from 'antd';
import objectFitImages from 'object-fit-images';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Autocomplete from '../../components/Kit/AutoComplete/AutoComplete';
import styles from './Service.module.styl';

class Services extends Component {
    static propTypes = {
        selectedProfession: PropTypes.objectOf(PropTypes.any).isRequired,
        proficients: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        title: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        provinces: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        ProjectsForProfession: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired
    };

    componentDidMount() {
        objectFitImages();
    }

    registerProject = () => {
        console.log(this.props.selectedProfession, 'askjdakjdbasjkldb');
    };

    onProvinceSelect = (value, option) => {
        // console.log('onSubmit', value, option);
    };

    getProfessionPrice = () => {
        const { priceBase, priceRange } = this.props.selectedProfession;

        let unit;
        switch (priceBase) {
            case 'Second':
                unit = 'ثانیه ای';
                break;
            case 'Hour':
                unit = 'ساعتی';
                break;
            case 'Day':
                unit = 'روزی';
                break;
            case 'Month':
                unit = 'ماهی';
                break;
            case 'Session':
                unit = 'جلسه ای';
                break;
            case 'Project':
                unit = 'پروژه ای';
        }
        return ` از ${unit} ${priceRange.min} تومان`;
    };

    render() {
        const { proficients, title, selectedProfession, count, provinces, ProjectsForProfession } = this.props;
        console.log(proficients);
        return (
            <div className={styles.wrapper}>
                <Header />

                <div className={styles.hero}>
                    <div className={styles.heroBg}>
                        <img src="https://chibaki.ir/assets/images/hero/architect.jpg" alt="Smiley face" />
                    </div>
                    <div className={styles.heroContent}>
                        <div>
                            <h1 className={styles.heroTitle}>{title}</h1>
                            <Button type="primary" size="large" onClick={this.registerProject}>
                                ثبت درخواست
                            </Button>
                        </div>
                    </div>
                </div>

                <div className={styles.container}>

                    <div className={styles.price}>
                        شروع قیمت در چی باکی:
                        {this.getProfessionPrice()}
                    </div>

                    <div className={styles.desc}>
                        {selectedProfession.description}
                    </div>

                    <div className={`${styles.section} u-t--c`}>
                        <div style={{ display: 'none' }}>
                            <div>استان خود را انتخاب کنید</div>
                            <div>
                                <Autocomplete
                                    options={provinces.map((province) => {
                                        province.title = province.name;
                                        return province;
                                    })}
                                    onSubmit={this.onProvinceSelect}
                                    showBtn={false}
                                    placeholder="انتخاب استان"
                                />
                            </div>
                        </div>
                        <div>
                            <button className="c-btn c-btn--primary c-btn--lg" onClick={this.registerProject}>
                                ثبت درخواست
                            </button>

                        </div>
                    </div>


                    <div>
                        <div>
                            <h1 className={styles.title}>
                                متخصصین
                                {' '}
                                {title}
                                {' '}
                                در چی باکی (
                                {count}
                                {' '}
                                متخصص)
                            </h1>
                            <div className={styles.subtitle}>نمایش تصادفی</div>
                        </div>
                        <div>
                            {proficients.map((item) => {
                                return (
                                    <Link to={`/profession/${item.id}`}>
                                        <div className={`c-card ${styles.card}`}>
                                            <Row type="flex">
                                                <Col span={8}>
                                                    <Row type="flex" className="l-flex-row-r">
                                                        <Col span={4}>
                                                            <span>badge</span>

                                                        </Col>
                                                        <Col span={20}>
                                                            <Row type="flex">
                                                                <Col span={24}>
                                                                    <img
                                                                        src={
                                                                            item &&
                                                                            item.trust &&
                                                                            item.trust.profilePicture &&
                                                                            item.trust.profilePicture.filePath
                                                                                ? `https://chibaki.ir${item.trust.profilePicture.filePath.replace('public', '')}`
                                                                                : 'https://chibaki.ir/profile/images/unknown.jpg'
                                                                        }
                                                                        alt={`${item.firstname} ${item.lastname}`}
                                                                        className={styles.avatar}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col span={24}>
                                                                    <div
                                                                        className={styles.cardName}
                                                                    >
                                                                        {`${item.firstname} ${item.lastname}`}
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col span={16}>
                                                    <Row type={'flex'}>
                                                        <Col>
                                                            <div className={styles.cardDesc}>
                                                                {item.introDescription || 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. '}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Row type="flex" justify="space-between">
                                                                <Col>
                                                                    تعداد دفعات
                                                                </Col>
                                                                <Col>
                                                                    <button
                                                                        className={styles.btn}
                                                                    >
                                                                        مشاهده پروفایل
                                                                    </button>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                        <div>
                            <button>
                                شاهده بیشتر
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect(
    state => ({
        proficients: state.proficients.proficients,
        title: state.proficients.title,
        selectedProfession: state.proficients.selectedProfession,
        count: state.proficients.count,
        provinces: state.provinces.provinces,
        ProjectsForProfession: state.ProjectsForProfession.ProjectsForProfession
    })
)(Services);
