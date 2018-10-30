import React, { Component } from 'react';
import { Tabs, Input } from 'antd';
import PropTypes from 'prop-types';
import { AutoComplete } from '../Kit';
import styles from './Register.module.styl';

export default class Register extends Component {
    static propTypes = {
        professions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        setUserLastName: PropTypes.func.isRequired,
        setUserName: PropTypes.func.isRequired,
        selectProfession: PropTypes.func.isRequired
    };
    onChangeName = (e) => {
        this.props.setUserName(e.target.value);
    };
    onChangeLastName = (e) => {
        this.props.setUserLastName(e.target.value);
    };
    handleSelect = (professionId) => {
        this.props.selectProfession(professionId);
    };
    renderRegisterForm = (showAutoComplete) => {
        const { professions } = this.props;
        return (
            <div>
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
                {
                    showAutoComplete ? <div className={styles.inputWrapper}>
                        <AutoComplete
                            options={professions}
                            showBtn={false}
                            placeholder="تخصص خود را انتخاب کنید."
                            onSubmit={this.handleSelect}
                        >
                            <Input type="text" />
                        </AutoComplete>
                    </div> : null
                }
            </div>
        );
    };

    componentWillMount() {
        this.event({
            category: 'user',
            action: 'INSIDE_REGISTER',
            label: 'user visited register page'
        });
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="ثبت نام متخصص" key="1">{this.renderRegisterForm(true)}</Tabs.TabPane>
                    <Tabs.TabPane tab="ثبت نام مشتری" key="2">{this.renderRegisterForm(false)}</Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}
