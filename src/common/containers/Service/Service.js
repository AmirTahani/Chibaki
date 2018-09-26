import React, { Component } from 'react';
import { Link } from 'react-router';
import '../Services/Services.css';
import { Row, Col, Tooltip } from 'antd';
import  './ServiceStyle.css';
import { connect } from 'react-redux';
import 'antd/dist/antd.less'
class Services extends Component {

    registerProject = () => {
        console.log('this')
    }

    render() {
        const { proficients, title, selectedProfession, count } = this.props;
        console.log(proficients)
        return (
            <div>
            <Row type={'flex'} gutter={30}>
                <Col span={24} className="header-image_container" >
                    <img src={'https://chibaki.ir/assets/images/hero/architect.jpg'}  alt="Smiley face"/>
                    <div className={'absolute-cover'}>
                        <h1 className={'page-title'}> {title}</h1>
                        <button onClick={this.registerProject}>
                            ثبت درخواست
                        </button>
                    </div>
                </Col>
            </Row>
            <Row type={'flex'} >
                <Col span={24}>
                    <div>
                        <button onClick={this.registerProject}>
                            ثبت درخواست
                        </button>
                    </div>
                    <div>
                        متخصصین
                        { ' ' + title + ' '}
                        در چی‌باکی (
                        {count}
                        متخصص)
                    </div>
                    <span>نمایش تضادفی</span>
                </Col>
            </Row>
            {proficients.map((item) => {
                return (
                    <Row type={'flex'} align={'middle'} justify={'center'} >
                        <Link to={`/profession/${item.id}`}>
                            <Col span={8} >
                                <Row>
                                    <Col span={4}>
                                        <span>badge</span>

                                    </Col>
                                    <Col span={20}>
                                        <Row>
                                            <Col span={24}>
                                                <img src={'https://chibaki.ir/' + item.profilePicture.filePath.replace('public', '')} className={'prof-image'}/>

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24}>
                                                <span>{item.firstname + ' ' + item.lastname}</span>
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
                                    <button >
                                       مشاهده پروفایل
                                    </button>
                                </Row>
                            </Col>
                        </Link>
                    </Row>
                )
            })}
            <div>
                <button >
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
        count: state.proficients.count

    }),
    undefined
)(Services)
