import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Row, Col, Tooltip } from 'antd';
import { connect } from 'react-redux';
import queryString from 'query-string';
import styles from '../Services/Services.module.styl';
import { loader } from '../../redux/modules/professions';

class Services extends Component {
    static propTypes = {
        location: PropTypes.objectOf(PropTypes.any).isRequired,
        cat: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        loadConnect: PropTypes.func.isRequired
    };

    scrollToCat = (cat) => {
        setTimeout(() => {
            if (this.refs[cat]) {
                const offset = 80;
                const item = ReactDOM.findDOMNode(this.refs[cat]);
                const wrapper = window;
                const count = item.offsetTop - wrapper.pageYOffset - offset;

                wrapper.scrollBy({
                    top: count,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }, 200);
    }

    componentDidMount() {
        const { location } = this.props;
        const params = queryString.parse(location.search);

        if (params && params.cat) {
            this.scrollToCat(params.cat);
        }

        if (window && window.__renderType__ === 'client') {
            this.props.loadConnect();
        }
    }

    componentDidUpdate(prevProps) {
        const { location } = this.props;
        const params = queryString.parse(location.search);
        const prevParams = queryString.parse(prevProps.location.search);

        if (params && params.cat && prevParams.cat !== params.cat) {
            this.scrollToCat(params.cat);
        }
    }

    render() {
        const { cat } = this.props;
        return (
            <div
                className={styles.container}
            >
                <Helmet>
                    <title>
                        {
                            'چی باکی - خدمات - Chibaki'
                        }
                    </title>
                </Helmet>
                <div className={styles.servicesNav}>
                    {cat.map((item) => {
                        return (
                            <NavLink
                                to={`/${encodeURI('خدمات')}?cat=${item.label.split(' ').join('_')}`}
                                className={styles.servicesNavItem}
                                exact
                            >
                                {item.label}
                            </NavLink>
                        );
                    })}
                </div>
                <div className={styles.servicesContainer}>
                    {cat.map((item) => {
                        return (
                            <section
                                ref={item.label.split(' ').join('_')}
                                id={item.label.split(' ').join('_')}
                                className={styles.servicesRow}
                            >
                                <h2 className={styles.servicesHeading}>{item.label}</h2>
                                <img
                                    src={item.cover}
                                    alt={item.label}
                                    className={styles.servicesCover}
                                />
                                <div
                                    className={styles.servicesWrapper}
                                >
                                    {
                                        item.professions.map((profession) => {
                                            return (
                                                <div
                                                    key={profession.title}
                                                >
                                                    <h3>
                                                        <Link
                                                            to={`/${encodeURI('خدمات')}/${profession.title.split(' ').join('_')}`}
                                                            className={`${styles.servicesItem} ${profession.profession_id ? styles.serviceItemChild : ''}`}
                                                        >
                                                            {profession.title}
                                                        </Link>
                                                    </h3>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
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
