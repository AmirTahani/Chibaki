import React, { Component } from 'react';
import { Link } from 'react-router';
import '../Services/Services.css';
import { Row, Col, Tooltip } from 'antd';
import { connect } from 'react-redux';
import 'antd/dist/antd.less'
// import professions from "../../redux/modules/professions";


class Professional extends Component {
    render() {
        // const { cat } = this.props;
        return (
            <div className="Home Container">
                    asdprof
            </div>
        );
    }
}
export default connect(
    state => ({
        // cat: state.professions.categories
    }),
    undefined
)(Professional)
