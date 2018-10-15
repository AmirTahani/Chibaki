import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Row, Col, Tooltip, Button } from 'antd';
import objectFitImages from 'object-fit-images';
import { connect } from 'react-redux';

import styles from './ServiceStyle.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

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
                        شروع قیمت در چی باکی: از جلسه‌ای
                    </div>

                    <div className={styles.desc}>
                        {selectedProfession.description}
                    </div>

                    <Row type="flex">
                        <Col span={24}>
                            <div>
                                <Button onClick={this.registerProject}>
                                    ثبت درخواست
                                </Button>
                            </div>
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
                        </Col>
                    </Row>
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
