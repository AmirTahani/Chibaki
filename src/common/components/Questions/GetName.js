import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Input, Radio } from 'antd';
import styles from './GetName.module.styl';
import { persianRegex, toPersianChar } from '../../utils/persian';

export default class GetName extends PureComponent {
    static propTypes = {
        question: PropTypes.objectOf(PropTypes.any).isRequired,
        setUserName: PropTypes.func.isRequired,
        onEnter: PropTypes.func.isRequired,
        setUserLastName: PropTypes.func.isRequired,
        setUserGender: PropTypes.func.isRequired,
        gender: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        showOnlyGender: PropTypes.bool
    };

    static defaultProps = {
        showOnlyGender: false
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (ReactDOM.findDOMNode(e.target).reportValidity()) {
            this.props.onEnter();
        }
        return false;
    };

    componentWillMount() {
        this.event({
            category: 'user',
            action: 'INSIDE_REGISTER',
            label: 'user visited register page'
        });
    }

    onChangeName = (e) => {
        const value = toPersianChar(e.target.value);
        const regex = new RegExp(persianRegex);

        if (!value) {
            ReactDOM.findDOMNode(e.target).setCustomValidity('لطفا نام خود را وارد کنید');
            this.props.setUserName(value);
            return;
        }

        if (!regex.test(value)) {
            ReactDOM.findDOMNode(e.target).setCustomValidity('لطفا نام خود را فارسی وارد کنید');
            ReactDOM.findDOMNode(e.target).reportValidity();
            return;
        }

        ReactDOM.findDOMNode(e.target).setCustomValidity('');

        this.props.setUserName(value);
    };

    onChangeLastName = (e) => {
        const value = toPersianChar(e.target.value);
        const regex = new RegExp(persianRegex);

        if (!value) {
            ReactDOM.findDOMNode(e.target).setCustomValidity('لطفا نام خانوادگی خود را وارد کنید');
            this.props.setUserLastName(value);
            return;
        }

        if (!regex.test(value)) {
            ReactDOM.findDOMNode(e.target).setCustomValidity('لطفا نام خانوادگی خود را فارسی وارد کنید');
            ReactDOM.findDOMNode(e.target).reportValidity();
            return;
        }

        ReactDOM.findDOMNode(e.target).setCustomValidity('');

        this.props.setUserLastName(value);
    };

    onChangeGender = (e) => {
        this.props.setUserGender(e.target.value);
    };

    render() {
        const { question, showOnlyGender } = this.props;
        const RadioGroup = Radio.Group;
        const plainOptions = [
            { label: 'مرد', value: 'male' },
            { label: 'زن', value: 'female' },
        ];
        return (
            <form onSubmit={this.onSubmit}>
                <p className={styles.title}>{question.title}</p>
                <div className={styles.inputsWrapper}>
                    {!showOnlyGender ?
                        <div>
                            <div className={styles.inputWrapper}>
                                <Input
                                    placeholder="نام خود را وارد کنید.(فارسی)"
                                    onChange={this.onChangeName}
                                    value={this.props.firstName}
                                    pattern={persianRegex}
                                    autoFocus
                                    required
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <Input
                                    placeholder="نام خانوادگی خود را وارد کنید.(فارسی)"
                                    onChange={this.onChangeLastName}
                                    value={this.props.lastName}
                                    pattern={persianRegex}
                                    required
                                />
                            </div>
                        </div>
                        : null
                    }
                    <div className={styles.inputWrapper}>
                        <RadioGroup
                            options={plainOptions}
                            onChange={this.onChangeGender}
                            value={this.props.gender}
                            required
                        />
                    </div>
                </div>
                {/* Have a hidden submit button for enter keydown event to work */}
                <input
                    type="submit"
                    className={styles.submit}
                />
            </form>
        );
    }
}
