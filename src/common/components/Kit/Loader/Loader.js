import React, { Component } from 'react';
import styles from './Loader.module.styl';

export default class Loader extends Component {
    render() {
        return (
            <div>
                <div className={styles.spinner}>
                    <div className={styles.dot1} />
                    <div className={styles.dot2} />
                </div>
            </div>
        );
    }
}
