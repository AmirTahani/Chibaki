import React from 'react';
import styles from './NotFound.module.styl';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>404</h1>
            <p className={styles.text}>صفحه مورد نظر پیدا نشد.</p>
        </div>
    );
}
