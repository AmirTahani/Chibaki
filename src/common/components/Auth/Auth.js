import React, { Component } from 'react';
import { Modal } from 'antd';
import styles from './Auth.module.styl';


export default class Auth extends Component {
    render() {
        return (
            <Modal
                visible={this.state.visible}
                className={styles.modal}
                footer={null}
                closable={false}
            >
                <button className={styles.closeButton} onClick={() => this.toggleModal()}>X</button>
            </Modal>
        );
    }
}
