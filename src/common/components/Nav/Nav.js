import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { slide as Menu } from 'react-burger-menu';
import { sitePath } from '../../config';
import styles from './Nav.module.styl';

class Nav extends Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        toggleAuthModal: PropTypes.func.isRequired
    };

    state = {
        menuOpen: false
    };

    handleAuth = () => {
        this.props.toggleAuthModal();
    };

    closeMenu = () => {
        this.setState({
            menuOpen: false
        });
    };

    handleGoToAngular = () => {
        window.open(`${sitePath}/pages/dashboard`, '_self');
    };

    handleStateChange = (state) => {
        this.setState({
            menuOpen: state.isOpen
        });
    };

    getNavItems = () => {
        const { user } = this.props;
        if (user && user._id) {
            return [
                {
                    label: 'خدمات',
                    link: `/${encodeURI('خدمات')}`
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
                link: '/signup',
                action: this.handleAuth
            },
            {
                label: 'خدمات',
                link: `/${encodeURI('خدمات')}`
            }
        ];
    };

    getMenu = (mobile = false) => {
        const items = this.getNavItems();
        const className = !mobile ? styles.listLink : styles.listLinkMobile;
        return items.map((item) => {
            return (
                <li key={item.label}>
                    {
                        item.action
                            ? <div
                                className={className}
                                onClick={() => {
                                    item.action();
                                    this.closeMenu();
                                }}
                            >
                                {item.label}
                            </div>
                            : <Link to={item.link} onClick={this.closeMenu} className={className}>
                                {item.label}
                            </Link>
                    }
                </li>
            );
        });
    };

    render() {
        const { menuOpen } = this.state;
        return (
            <nav>
                <ul className={styles.list}>
                    {this.getMenu()}
                </ul>
                <Menu
                    right
                    isOpen={menuOpen}
                    onStateChange={state => this.handleStateChange(state)}
                    className={styles.menuMobile}
                >
                    {this.getMenu(true)}
                </Menu>
            </nav>
        );
    }
}

export default Nav;
