import React, { Component } from 'react';
import { Select } from 'antd';

export default class SelectQuestion extends Component {
    state = {
        province: {},
        city: {},
        address: ''
    };

    handleChange = (value) => {
        console.log('this is value', value);
    };

    render() {
        const { question, provinces, loading, loaded } = this.props;
        console.log(loading, 'loading');
        console.log(loaded, 'loaded');
        console.log(provinces, 'provinces');
        return (
            <div>
                {
                    loading && !loaded ? <p>loading..</p> : null
                }
                {
                    !loading && loaded ? <Select style={{ width: 120 }} onChange={this.handleChange}>
                        {
                            provinces.map(item => {
                                return <Select.Option value={item}>{item.name}</Select.Option>;
                            })
                        }
                    </Select> : null
                }
            </div>
        );
    }
}