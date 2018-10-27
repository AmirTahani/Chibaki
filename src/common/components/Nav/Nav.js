import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Navigation, ListItem, ListLink, ListClickable } from './Nav.styles';
import { sitePath } from '../../config';

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
        console.log(user, ' this is user');
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
                label: 'ثبت نام/ورود',
                link: 'signup',
                action: this.handleAuth
            },
            {
                label: 'خدمات',
                link: encodeURI('خدمات')
            },
            {
                label: 'پروفایل',
                action: this.handleGoToAngular
            }
        ];
    };

    render() {
        const navItems = this.getNavItems();
        return (
            <Navigation>
                <List>
                    {
                        navItems.map((nav) => {
                            return (
                                <ListItem key={nav.label}>
                                    {
                                        nav.action
                                            ? <ListClickable onClick={nav.action}>
                                                {nav.label}
                                            </ListClickable>
                                            : <ListLink to={nav.link} className="c-nav__link">
                                                {nav.label}
                                            </ListLink>
                                    }
                                </ListItem>
                            );
                        })
                    }
                </List>
            </Navigation>
        );
    }
}

export default Nav;
