import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { slide as Menu } from 'react-burger-menu';
import { sitePath, profilePath } from '../../config';
import styles from './Nav.module.styl';

class Nav extends Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        toggleAuthModal: PropTypes.func.isRequired,
        handleScroll: PropTypes.func.isRequired,
        location: PropTypes.objectOf(PropTypes.any).isRequired,
        history: PropTypes.objectOf(PropTypes.any).isRequired
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

    handleScroll = (type) => {
        this.props.handleScroll(type);
    };

    handleGoToAngular = () => {
        window.open(profilePath, '_self');
    };

    handleStateChange = (state) => {
        this.setState({
            menuOpen: state.isOpen
        });
    };

    getNavItems = () => {
        const { user } = this.props;
        return [
            user &&
            user._id ?
                {
                    label: 'پروفایل',
                    action: this.handleGoToAngular
                } : {
                    label: 'ثبت نام / ورود',
                    link: '/login',
                    // action: this.handleAuth
                },
            {
                label: 'خدمات',
                link: '/خدمات'
            },
            {
                label: 'چگونه کار می‌کند',
                action: () => this.goToHomeAndScroll('howitworks')
            },
            {
                label: 'چرا چی باکی',
                action: () => this.goToHomeAndScroll('features')
            }
        ];
    };

    goToHomeAndScroll = (type) => {
        const { location, history } = this.props;
        const currentLocation = decodeURI(location.pathname);
        if (currentLocation === '/درباره_ما' || currentLocation === '/تماس_با_ما') {
            history.push('/');
            window.setTimeout(() => this.handleScroll(type), 300);
        } else {
            this.handleScroll(type);
        }
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
                    <Link
                        to="/"
                        className={styles.logoMobileLink}
                        onClick={this.closeMenu}
                    >
                        <img
                            src="/assets/images/logo/logo-text.svg" alt="چی باکی - Chibaki"
                            className={styles.logoMobile}
                        />
                    </Link>
                    {this.getMenu(true)}
                </Menu>
            </nav>
        );
    }
}

export default withRouter(Nav);
