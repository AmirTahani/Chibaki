import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import '../Services/Services.css';
import './ServiceStyle.css';

class Services extends Component {
    static propTypes = {
        selectedProfession: PropTypes.objectOf(PropTypes.any).isRequired,
        proficients: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        title: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired
    };

    registerProject = () => {
        console.log(this.props.selectedProfession, 'askjdakjdbasjkldb');
    };

    render() {
        const { proficients, title, selectedProfession, count, provinces } = this.props;
        console.log(proficients)
        return (
            <div>
                <Row type={'flex'} gutter={30}>
                    <Col span={24} className="header-image_container">
                        <img src="https://chibaki.ir/assets/images/hero/architect.jpg" alt="architect" />
                        <div className={'absolute-cover'}>
                            <h1 className={'page-title'}> {title}</h1>
                            <button onClick={this.registerProject}>
                                ثبت درخواست
                            </button>
                        </div>
                    </Col>
                </Row>
                <Row type={'flex'}>
                    <Col span={24}>
                        <div>
                            <button onClick={this.registerProject}>
                                ثبت درخواست
                            </button>
                        </div>
                        <div>
                            متخصصین
                            {' '}
                            {title}
                            {' '}
                            در چی‌باکی (
                            {count}
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
                                                    {/*<img*/}
                                                        {/*src={`https://chibaki.ir/${item.profilePicture.filePath.replace('public', '')}`}*/}
                                                        {/*className="prof-image"*/}
                                                        {/*alt="user profile"*/}
                                                    {/*/>*/}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <span>{item.firstname}{' '}{item.lastname}</span>
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
        );
    }
}
export default connect(
    state => ({
        proficients: state.proficients.proficients,
        title: state.proficients.title,
        selectedProfession: state.proficients.selectedProfession,
        count: state.proficients.count,
        provinces: state.provinces.provinces
}))(Services);

