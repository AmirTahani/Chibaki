import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Kit/Loader/Loader';
import styles from './Auth.module.styl';

class Auth extends Component {
    static propTypes = {
        loggingIn: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired
    };

    render() {
        console.log('render Auth');
        const { loggingIn } = this.props;

        return (
            <div
                className={styles.wrapper}
            >
                <form
                    onSubmit={this.onFormSubmit}
                    className={styles.content}
                >
                    <div className={styles.header}>
                        <h1>
                            <Link to="/" className={styles.logo}>
                                <img
                                    src="/assets/images/logo/logo-text.svg"
                                    alt="چی باکی - Chibaki"
                                    className={styles.logoImg}
                                />
                            </Link>
                        </h1>
                    </div>
                    <div className={styles.body}>
                        {this.props.children}
                    </div>
                    <div className={styles.footer}>
                        <button
                            className={`${styles.btnSubmit} c-btn c-btn--lg c-btn--primary`}
                            onClick={this.handleClick}
                            type="submit"
                            disabled={loggingIn}
                        >
                            <div className={`${styles.btnWrapper} ${loggingIn ? styles.btnWrapperLoading : ''}`}>
                                { loggingIn ? (
                                    <Loader
                                        customWrapperClass={styles.btnLoader}
                                        customDotClass={styles.btnLoaderDot}
                                    />
                                ) : 'ادامه' }
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(state => ({
    loggingIn: state.auth.loggingIn
}))(Auth);
