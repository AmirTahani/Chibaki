import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Row, Col, Tooltip, Button } from 'antd';
import objectFitImages from 'object-fit-images';
import { connect } from 'react-redux';

import styles from './ServiceStyle.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Autocomplete from '../../components/Kit/AutoComplete/AutoComplete';

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
        console.log(ProjectsForProfession);
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

                <div className={`l-container ${styles.container}`}>

                    <div className={styles.price}>
                        شروع قیمت در چی باکی:
                        {this.getProfessionPrice()}
                    </div>

                    <div className={styles.desc}>
                        {selectedProfession.description}
                    </div>

                    <div className={`${styles.section}`}>
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


                    <div style={{ display: 'none' }}>
                        <div>
                            متخصصین
                            {' '}
                            {title}
                            {' '}
                            در چی‌باکی (
                            {count}
                            {' '}
                            متخصص)
                        </div>
                        <span>نمایش تضادفی</span>
                        {proficients.map((item) => {
                            return (
                                <Row type={'flex'} align={'middle'} justify={'center'}>
                                    <Link to={`/profession/${item.id}`}>
                                        <Col span={8}>
                                            <Row>
                                                <Col span={4}>
                                                    <span>badge</span>

                                                </Col>
                                                <Col span={20}>
                                                    <Row>
                                                        <Col span={24}>
                                                            <img
                                                                src={item.profilePicture && `https://chibaki.ir/${item.profilePicture.filePath.replace('public', '')}`}
                                                                className={'prof-image'}
                                                            />

                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col span={24}>
                                                            <span>{`${item.firstname} ${item.lastname}`}</span>
                                                        </Col>
                                                    </Row>

                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={16}>
                                            <Row>
                                                {item.introDescription}
                                            </Row>
                                            <Row>
                                                <button>
                                                    مشاهده پروفایل
                                                </button>
                                            </Row>
                                        </Col>
                                    </Link>
                                </Row>
                            );
                        })}
                        <div>
                            <button>
                                مشاهده بیشتر
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
    }))(Services);
