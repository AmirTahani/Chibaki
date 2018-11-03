import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Row, Col, Tooltip } from 'antd';
import { connect } from 'react-redux';
import '../Services/Services.css';
import { loader } from '../../redux/modules/professions';

// import professions from "../../redux/modules/professions";


class Services extends Component {
    static propTypes = {
        location: PropTypes.objectOf(PropTypes.any).isRequired,
        cat: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        loadConnect: PropTypes.func.isRequired

    };

    componentDidMount() {
        const { location } = this.props;
        setTimeout(() => {
            if (this.exist(location, 'query.cat')) {
                if (this.refs[location.query.cat]) {
                    ReactDOM.findDOMNode(this.refs[this.props.location.query.cat]).scrollIntoView({
                        block: 'start',
                        inline: 'nearest',
                        behavior: 'smooth'
                    });
                }
            }
        }, 500);

        if (window && window.__renderType__ === 'client') {
            this.props.loadConnect();
        }
    }

    render() {
        const { cat } = this.props;
        return (
            <div className="Home Container">
                <div className="l-container l-container--fixed-header">
                    {cat.map((item) => {
                        return (
                            <section
                                ref={item.label.split(' ').join('_')}
                                id={item.label.split(' ').join('_')}
                                className="section"
                            >
                                <h2 className="services_heading">{item.label}</h2>
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
                                                        <Link
                                                            to={`/${encodeURI('خدمات')}/${profession.title.split(' ').join('_')}`}
                                                        >
                                                            {profession.title}
                                                        </Link>
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
            </div>
        );
    }
}

export default connect(state => ({
    cat: state.professions.categories
}), {
    loadConnect: loader
})(Services);
