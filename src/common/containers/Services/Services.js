import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
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
                const offset = window.innerWidth > 1300 ? 80 : 120;
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

        if (params && params.cat) {
            this.scrollToCat(params.cat);
        }
    }

    render() {
        const { cat, professions } = this.props;
        return (
            <div>
                <Helmet>
                    <title>
                        {
                            'چی باکی - خدمات - Chibaki'
                        }
                    </title>
                </Helmet>
                {(cat && cat.length) &&
                    <div
                        className={styles.container}
                    >
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
                                            src={`/assets/images/categories/${item._id}@320.jpg`}
                                            srcSet={`/assets/images/categories/${item._id}@320.jpg 300w, /assets/images/categories/${item._id}@600.jpg 600w`}
                                            sizes="(min-width: 600px) 600px"
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
                                                                    className={`${styles.servicesItem} ${(profession.children && profession.children.length) ? styles.servicesItemParent : ''}`}
                                                                >
                                                                    {(profession.children && profession.children.length)
                                                                        ? <span className={`${styles.servicesItemIcon} icon-chevron-down`} />
                                                                        : null }
                                                                    {profession.title}
                                                                </Link>
                                                            </h3>
                                                            {
                                                                profession.children.map((childProfession) => {
                                                                    return (
                                                                        <h3
                                                                            key={childProfession.title}
                                                                        >
                                                                            <Link
                                                                                to={`/${encodeURI('خدمات')}/${childProfession.title.split(' ').join('_')}`}
                                                                                className={`${styles.servicesItem}`}
                                                                            >
                                                                                {childProfession.title}
                                                                            </Link>
                                                                        </h3>
                                                                    );
                                                                })
                                                            }
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
                }
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
