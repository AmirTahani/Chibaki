import React, { Component } from 'react';
import { List, Navigation, ListItem, ListLink } from './Nav.styles';

class Nav extends Component {
    navItems = [
        {
            label: 'ثبت نام',
            link: 'signup'
        },
        {
            label: 'ورود',
            link: '#'
        },
        {
            label: 'خدمات',
            link: encodeURI('خدمات')
        }
    ];

    render() {
        return (
            <Navigation>
                <List>
                    {
                        this.navItems.map((nav) => {
                            return (
                                <ListItem key={nav.label}>
                                    <ListLink to={nav.link} className="c-nav__link">
                                        {nav.label}
                                    </ListLink>
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
