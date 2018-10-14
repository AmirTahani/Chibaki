import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import styles from './GetName.module.css';

export default class GetName extends PureComponent {
    static propTypes = {
        question: PropTypes.objectOf(PropTypes.any).isRequired
    };

    onChangeName = (e) => {
        this.props.setUserName(e.target.value);
    };

    onChangeLastName = (e) => {
        this.props.setUserLastName(e.target.value);
    };

    render() {
        const { question } = this.props;
        return (
            <div>
                <p className={styles.title}>{question.title}</p>
                <div className={styles.inputsWrapper}>
                    <div className={styles.inputWrapper}>
                        <Input
                            placeholder="نام خود را وارد کنید.(فارسی)"
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <Input
                            placeholder="نام خانوادگی خود را وارد کنید.(فارسی)"
                            onChange={this.onChangeLastName}
                        />
                    </div>
                </div>
            </div>
        );
    }
}