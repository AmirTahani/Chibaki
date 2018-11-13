import { Link } from 'react-router';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    toggleAuthModal,
    setUserMobile,
    setUserName,
    setUserLastName,
    setUserCode,
    login,
    register,
    verify
} from '../../redux/modules/auth';
import Auth from '../Auth/Auth';
import Nav from '../Nav/Nav';
import styles from './Header.module.styl';

class Header extends Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        professions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        showAuthModal: PropTypes.bool.isRequired,
        toggleAuthModalConnect: PropTypes.func.isRequired,
        setUserMobileConnect: PropTypes.func.isRequired,
        verifyConnect: PropTypes.func.isRequired,
        setUserNameConnect: PropTypes.func.isRequired,
        setUserLastNameConnect: PropTypes.func.isRequired,
        setUserCodeConnect: PropTypes.func.isRequired,
        loginConnect: PropTypes.func.isRequired,
        registerConnect: PropTypes.func.isRequired,
        mobile: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        handleScroll: PropTypes.func.isRequired
    };

    handleScroll = (type) => {
        this.props.handleScroll(type);
    }

    render() {
        const {
            user,
            showAuthModal,
            toggleAuthModalConnect,
            setUserCodeConnect,
            setUserLastNameConnect,
            setUserNameConnect,
            setUserMobileConnect,
            mobile,
            loginConnect,
            firstName,
            lastName,
            code,
            professions,
            registerConnect,
            verifyConnect
        } = this.props;
        return (
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <Auth
                        showModal={showAuthModal}
                        toggleAuthModal={toggleAuthModalConnect}
                        setUserCode={setUserCodeConnect}
                        setUserLastName={setUserLastNameConnect}
                        setUserName={setUserNameConnect}
                        setUserMobile={setUserMobileConnect}
                        mobile={mobile}
                        login={loginConnect}
                        firstName={firstName}
                        lastName={lastName}
                        code={code}
                        professions={professions}
                        register={registerConnect}
                        verify={verifyConnect}
                    />
                    <Nav
                        user={user}
                        toggleAuthModal={toggleAuthModalConnect}
                        handleScroll={this.handleScroll}
                    />
                    <div className={styles.logo}>
                        <Link to="/">
                            <div className="sr-only">چی باکی</div>
                            <img className={styles.img} src="/assets/images/logo/logo-text.svg" />
                        </Link>
                    </div>
                </div>
            </header>
        );
    }
}

export default connect(state => ({
    user: state.auth.user,
    showAuthModal: state.auth.showAuthModal,
    mobile: state.auth.mobile,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    code: state.auth.code,
    professions: state.professions.professions
}), {
    toggleAuthModalConnect: toggleAuthModal,
    verifyConnect: verify,
    setUserCodeConnect: setUserCode,
    setUserLastNameConnect: setUserLastName,
    setUserMobileConnect: setUserMobile,
    setUserNameConnect: setUserName,
    loginConnect: login,
    registerConnect: register
})(Header);
