import { Link } from 'react-router';
import React, { Component } from 'react';

import { HeaderComponent, HeaderInner, Logo, LogoImg } from './Header.styles';
import Nav from '../Nav/Nav';

class Header extends Component {
    render() {
        return (
            <HeaderComponent>
                <HeaderInner>
                    <Nav />
                    <Logo>
                        <Link to="/">
                            <div className="sr-only">چی باکی</div>
                            <LogoImg src="/assets/images/logo/logo-text.svg" />
                        </Link>
                    </Logo>
                </HeaderInner>
            </HeaderComponent>
        );
    }
}

export default Header;
