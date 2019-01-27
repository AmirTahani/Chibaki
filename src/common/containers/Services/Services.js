import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { LazyImage } from 'react-lazy-images';
import { StickyContainer, Sticky } from 'react-sticky';
import styles from '../Services/Services.module.styl';
import { loader } from '../../redux/modules/professions';
import AutoComplete from '../../components/Kit/AutoComplete/AutoComplete';

class Services extends Component {
    static propTypes = {
        location: PropTypes.objectOf(PropTypes.any).isRequired,
        professionsFlatChildren: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        categories: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        loadConnect: PropTypes.func.isRequired,
        history: PropTypes.objectOf(PropTypes.any).isRequired
    };

    onAutoCompleteSubmit = (profession) => {
        this.props.history.push(`/${encodeURI('خدمات')}/${profession.title.split(' ').join('-')}-${profession._id}?province=all`);
    };

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
        const { categories, professionsFlatChildren } = this.props;
        return (
            <div>
                <Helmet>
                    <title>
                        {
                            'چی باکی - خدمات - Chibaki'
                        }
                    </title>
                </Helmet>
                {(categories && categories.length) &&
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
                                        {categories.map((item) => {
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
                        <StickyContainer>
                            <Sticky>
                                {({ style }) => (
                                    <div style={style} className={styles.searchWrapper}>
                                        <AutoComplete
                                            options={professionsFlatChildren}
                                            valueAs={'obj'}
                                            onSubmit={this.onAutoCompleteSubmit}
                                            wrapperClassName={styles.searchComponent}
                                            fieldClassName={styles.searchField}
                                            fieldName={'servicesSearch'}
                                            inputClassName={styles.searchInput}
                                            dropdownClassName={styles.searchDropdown}
                                            placeholder="جستجو در خدمات"
                                            btnClassName={styles.searchBtn}
                                            btnContent={(<span className="icon-search" />)}
                                        />
                                    </div>
                                )}
                            </Sticky>
                        </StickyContainer>
                        <div className={styles.servicesContainer}>
                            {categories.map((category) => {
                                return (
                                    <section
                                        ref={category.label.split(' ').join('_')}
                                        key={category.label.split(' ').join('_')}
                                        id={category.label.split(' ').join('_')}
                                        className={styles.servicesRow}
                                    >
                                        <h2 className={styles.servicesHeading}>{category.label}</h2>
                                        <LazyImage
                                            src={`/assets/images/categories/${category.label.split(' ').join('_')}@320.jpg`}
                                            srcSet={`/assets/images/categories/${category.label.split(' ').join('_')}@320.jpg 320w,
                                                    /assets/images/categories/${category.label.split(' ').join('_')}@600.jpg 600w`}
                                            alt={category.label}
                                            placeholder={({ imageProps, ref }) => (
                                                <img
                                                    ref={ref}
                                                    src={'/assets/images/logo/Load-14.svg'}
                                                    alt={imageProps.alt}
                                                />
                                            )}
                                            actual={({ imageProps }) => (
                                                <img
                                                    {...imageProps}
                                                    className={styles.servicesCover}
                                                />
                                            )}
                                        />
                                        <div
                                            className={styles.servicesWrapper}
                                        >
                                            {
                                                category.professions.map((profession) => {
                                                    return (
                                                        <div
                                                            key={`${category.label.split(' ').join('_')}${profession.title.split(' ').join('_')}`}
                                                        >
                                                            <h3>
                                                                <Link
                                                                    to={`/${encodeURI('خدمات')}/${profession.title.split(' ').join('-')}-${profession._id}?province=all`}
                                                                    className={`${styles.servicesItem} ${styles.servicesItemParent}`}
                                                                >
                                                                    {(profession.children && profession.children.length)
                                                                        ? <span className={`${styles.servicesItemIcon} icon-chevron-down`} />
                                                                        : null }
                                                                    {profession.title}
                                                                </Link>
                                                            </h3>
                                                            {
                                                                (profession.children && profession.children.length) ? profession.children.map((childProfession) => {
                                                                    return (
                                                                        <h3
                                                                            key={`${category.label.split(' ').join('_')}${childProfession.title.split(' ').join('_')}`}
                                                                        >
                                                                            <Link
                                                                                to={`/${encodeURI('خدمات')}/${childProfession.title.split(' ').join('-')}-${childProfession._id}?province=all`}
                                                                                className={`${styles.servicesItem}`}
                                                                            >
                                                                                {childProfession.title}
                                                                            </Link>
                                                                        </h3>
                                                                    );
                                                                }) : null
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
    categories: state.professions.categories,
    professionsFlatChildren: state.professions.professionsFlatChildren
}), {
    loadConnect: loader
})(Services));
