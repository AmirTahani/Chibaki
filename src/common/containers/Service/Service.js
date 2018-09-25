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
                <div>شروع قیمت در چی‌باکی: از جلسه ای ۲۰۰۰۰۰ هزار تومان</div>
                    <p>
                        {selectedProfession.description}
                    </p>
                    <button onClick={this.registerProject}>
                        ثبت درخواست
                    </button>
                <Col>
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
