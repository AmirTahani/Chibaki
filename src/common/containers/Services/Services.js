import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import '../Services/Services.css';
import { Row, Col, Tooltip } from 'antd';
import { connect } from 'react-redux';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// import professions from "../../redux/modules/professions";


class Services extends Component {

    componentDidMount() {
        if (this.props.location && this.props.location.query && this.props.location.query.cat && this.refs[this.props.location.query.cat]) {
            ReactDOM.findDOMNode(this.refs[this.props.location.query.cat]).scrollIntoView()
        }
    }

    render() {
        const { cat } = this.props;
        return (
            <div className="Home Container">
                <Header />
                <div>
                    {cat.map((item) => {
                        return (
                            <section ref={item.category}>
                                <h2 className="services_heading">{item.category}</h2>
                                <Row>
                                    {item.professions.map((it, index) => {
                                        return (
                                            <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={6} key={index}>
                                                <h3 className="title">
                                                    <Tooltip title={it.description}>
                                                        <Link
                                                            to={`/${encodeURI('خدمات')}/${it.title.split(' ').join('_')}`}>{it.title}</Link>
                                                    </Tooltip>
                                                </h3>
                                            </Col>
                                        )
                                    })}
                                </Row>
                                <div className="seprator" />
                            </section>
                        )
                    })}
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect(state => ({
    cat: state.professions.categories
}))(Services)
