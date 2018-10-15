import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Row, Col, Tooltip } from 'antd';
import { connect } from 'react-redux';
import '../Services/Services.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// import professions from "../../redux/modules/professions";


class Services extends Component {
    static propTypes = {
        location: PropTypes.objectOf(PropTypes.any).isRequired,
        cat: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired
    };

    componentDidMount() {
        if (this.props.location && this.props.location.query && this.props.location.query.cat && this.refs[this.props.location.query.cat]) {
            ReactDOM.findDOMNode(this.refs[this.props.location.query.cat]).scrollIntoView();
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
                                    {
                                        item.professions.map((profession) => {
                                            return (
                                                <Col
                                                    xs={24}
                                                    sm={12}
                                                    md={8}
                                                    lg={8}
                                                    xl={8}
                                                    xxl={6}
                                                    key={profession.title}
                                                >
                                                    <h3 className="title">
                                                        <Tooltip title={profession.description}>
                                                            <Link
                                                                to={`/${encodeURI('خدمات')}/${profession.title.split(' ').join('_')}`}
                                                            >
                                                                {profession.title}
                                                            </Link>
                                                        </Tooltip>
                                                    </h3>
                                                </Col>
                                            );
                                        })
                                    }
                                </Row>
                                <div className="seprator" />
                            </section>
                        );
                    })}
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect(state => ({
    cat: state.professions.categories
}))(Services);
