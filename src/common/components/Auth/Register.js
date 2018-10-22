import React, { Component } from 'react';
import { Tabs, Input } from 'antd';
import { AutoComplete } from '../Kit';
import { flattenProfessionsByCategories } from '../../utils/serverHelper';

export default class Register extends Component {
    renderRegisterForm = () => {
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
                <div className={styles.inputWrapper}>
                    <AutoComplete
                        options={flattenProfessionsByCategories(professions)}
                    />
                </div>
            </div>
        );
    };

    render() {
        return (
            <div>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="ثبت نام متخصص" key="1">{this.renderRegisterForm}</Tabs.TabPane>
                    <Tabs.TabPane tab="ثبت نام مشتری" key="2">Content of Tab Pane 2</Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}
