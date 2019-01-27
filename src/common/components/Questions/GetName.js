import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';
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

    componentWillMount() {
        this.event({
            category: 'user',
            action: 'INSIDE_REGISTER',
            label: 'user visited register page'
        });
    }

    onChangeName = (e) => {
        const value = toPersianChar(e.target.value);
        this.props.setUserName(value);
        this.validateInput(value, e.target, 'نام');
    };

    onChangeLastName = (e) => {
        const value = toPersianChar(e.target.value);
        this.props.setUserLastName(value);
        this.validateInput(value, e.target, 'نام خانوادگی');
    };

    validateInput = (value, el, fieldName) => {
        if (!value) {
            ReactDom.findDOMNode(el).setCustomValidity(`لطفا ${fieldName} خود را وارد کنید`);
        } else if (ReactDom.findDOMNode(el).validity.patternMismatch) {
            ReactDom.findDOMNode(el).setCustomValidity(`لطفا ${fieldName} خود را فارسی وارد کنید`);
        } else {
            ReactDom.findDOMNode(el).setCustomValidity('');
        }
    }

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
            <div>
                <p className={styles.title}>{question.title}</p>
                <div className={styles.inputsWrapper}>
                    {!showOnlyGender ?
                        <div>
                            <div className={styles.inputWrapper}>
                                <label htmlFor="questionsFirstName" className={styles.label}>
                                    نام (فارسی)
                                </label>
                                <Input
                                    placeholder="مثال: علی"
                                    id="questionsFirstName"
                                    onChange={this.onChangeName}
                                    value={this.props.firstName}
                                    pattern={persianRegex}
                                    autoFocus
                                    required
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label htmlFor="questionsLastName" className={styles.label}>
                                    نام خانوادگی (فارسی)
                                </label>
                                <Input
                                    placeholder="مثال: محمدی"
                                    id="questionsLastName"
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
                        <div className={styles.label}>
                            جنسیت خود را انتخاب کنید
                        </div>
                        <RadioGroup
                            options={plainOptions}
                            onChange={this.onChangeGender}
                            value={this.props.gender}
                            required
                        />
                    </div>
                </div>
            </div>
        );
    }
}
