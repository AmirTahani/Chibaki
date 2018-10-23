import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Navigation, ListItem, ListLink, ListClickable } from './Nav.styles';

class Nav extends Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        toggleAuthModal: PropTypes.func.isRequired
    };

    handleAuth = () => {
        this.props.toggleAuthModal();
    };

    navItems = [
        {
            label: 'ثبت نام/ورود',
            link: 'signup',
            action: this.handleAuth
        },
        {
            label: 'خدمات',
            link: encodeURI('خدمات')
        }
    ];

    render() {
        const { user } = this.props;
        return (
            <Navigation>
                <List>
                    {
                        this.navItems.map((nav) => {
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
