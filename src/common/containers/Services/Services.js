import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Row, Col, Tooltip, Input, Button } from 'antd';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { StickyContainer, Sticky } from 'react-sticky';
import styles from '../Services/Services.module.styl';
import { loader } from '../../redux/modules/professions';
import AutoComplete from '../../components/Kit/AutoComplete/AutoComplete';

class Services extends Component {
    static propTypes = {
        location: PropTypes.objectOf(PropTypes.any).isRequired,
        professions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        cat: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        loadConnect: PropTypes.func.isRequired,
        history: PropTypes.objectOf(PropTypes.any).isRequired
    };

    onAutoCompleteSubmit = (professionTitle) => {
        this.props.history.push(`/${encodeURI('خدمات')}/${professionTitle}`);
    }

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
    };

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
        const { cat, professions } = this.props;
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
                <StickyContainer className={styles.servicesNavContainer}>
                    <Sticky>
                        {({ style }) => (
                            <div
                                className={styles.servicesNav}
                                style={style}
                            >
                                {cat.map((item) => {
                                    return (
                                        <NavLink
                                            exact
                                            to={`/${encodeURI('خدمات')}?cat=${item.label.split(' ').join('_')}`}
                                            className={styles.servicesNavItem}
                                            activeClassName="active"
                                            key={item.label.split(' ').join('_')}
                                        >
                                            {item.label}
                                        </NavLink>
                                    );
                                })}
                            </div>
                        )}
                    </Sticky>
                </StickyContainer>
                <div className={styles.servicesContainer}>
                    <div className={styles.searchWrapper}>
                        <AutoComplete
                            options={professions}
                            valueAs={'title'}
                            onSubmit={this.onAutoCompleteSubmit}
                            className={styles.searchComponent}
                            fieldName={'servicesSearch'}
                            fieldClassName={styles.searchInput}
                            dropdownClassName={styles.searchDropdown}
                            placeholder="جستجو در خدمات"
                            btnClassName={styles.searchBtn}
                            btnContent={(<span className="icon-search" />)}
                        />
                    </div>

                    {cat.map((item) => {
                        return (
                            <section
                                ref={item.label.split(' ').join('_')}
                                key={item.label.split(' ').join('_')}
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
                                                            {!profession.profession_id &&
                                                                <span className={`${styles.servicesItemIcon} icon-chevron-down`} />
                                                            }
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

export default withRouter(connect(state => ({
    cat: state.professions.categories,
    professions: state.professions.professions
}), {
    loadConnect: loader
})(Services));
