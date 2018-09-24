import React, { Component } from 'react';
import { Link } from 'react-router';
import '../Services/Services.css';
import { Row, Col, Tooltip } from 'antd';
import { connect } from 'react-redux';
import 'antd/dist/antd.less'
import {Row} from 'antd'

class Services extends Component {
    render() {
        const { cat } = this.props;
        return (
            <Row type={'flex'} gutter={30}>
              <img src={'https://chibaki.ir/assets/images/hero/architect.jpg'}  alt="Smiley face"/>
            </Row>
        );
    }
}
export default connect(
    state => ({
        proficients: state.proficients.proficients
    }),
    undefined
)(Services)
