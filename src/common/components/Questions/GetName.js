import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input, Radio } from 'antd';
import styles from './GetName.module.styl';

export default class GetName extends PureComponent {
    static propTypes = {
        question: PropTypes.objectOf(PropTypes.any).isRequired,
        setUserName: PropTypes.func.isRequired,
        onEnter: PropTypes.func.isRequired,
        setUserLastName: PropTypes.func.isRequired,
        setUserGender: PropTypes.func.isRequired,
        gender: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired
    };

    onKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.props.onEnter();
        }
    };

    componentWillMount() {
        this.event({
            category: 'user',
            action: 'INSIDE_REGISTER',
            label: 'user visited register page'
        });
    }

    onChangeName = (e) => {
        this.props.setUserName(e.target.value);
    };

    onChangeLastName = (e) => {
        this.props.setUserLastName(e.target.value);
    };

    onChangeGender = (e) => {
        this.props.setUserGender(e.target.value);
    };

    render() {
        const { question } = this.props;
        const RadioGroup = Radio.Group;
        const plainOptions = [
            { label: 'مرد', value: 'male' },
            { label: 'زن', value: 'female' },
        ];
        return (
            <div onKeyDown={this.onKeyDown}>
                <p className={styles.title}>{question.title}</p>
                <div className={styles.inputsWrapper}>
                    <div className={styles.inputWrapper}>
                        <Input
                            placeholder="نام خود را وارد کنید.(فارسی)"
                            onChange={this.onChangeName}
                            value={this.props.firstName}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <Input
                            placeholder="نام خانوادگی خود را وارد کنید.(فارسی)"
                            onChange={this.onChangeLastName}
                            value={this.props.lastName}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <RadioGroup options={plainOptions} onChange={this.onChangeGender} value={this.props.gender} />
                    </div>
                </div>
            </div>
        );
    }
}
