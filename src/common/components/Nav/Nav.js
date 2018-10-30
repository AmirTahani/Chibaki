import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { sitePath } from '../../config';
import styles from './Nav.module.styl';

class Nav extends Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        toggleAuthModal: PropTypes.func.isRequired
    };

    handleAuth = () => {
        this.props.toggleAuthModal();
    };

    handleGoToAngular = () => {
        window.open(`${sitePath}/pages/dashboard`, '_self');
    };


    getNavItems = () => {
        const { user } = this.props;
        if (user && user._id) {
            return [
                {
                    label: 'خدمات',
                    link: encodeURI('خدمات')
                },
                {
                    label: 'پروفایل',
                    action: this.handleGoToAngular
                }
            ];
        }
        return [
            {
                label: 'ثبت نام / ورود',
                link: 'signup',
                action: this.handleAuth
            },
            {
                label: 'خدمات',
                link: encodeURI('/خدمات')
            }
        ];
    };

    render() {
        const navItems = this.getNavItems();
        return (
            <nav>
                <ul className={styles.list}>
                    {
                        navItems.map((nav) => {
                            return (
                                <li key={nav.label}>
                                    {
                                        nav.action
                                            ? <div className={styles.listLink} onClick={nav.action}>
                                                {nav.label}
                                            </div>
                                            : <Link to={nav.link} className={styles.listLink}>
                                                {nav.label}
                                            </Link>
                                    }
                                </li>
                            );
                        })
                    }
                </ul>
            </nav>
        );
    }
}

export default Nav;
