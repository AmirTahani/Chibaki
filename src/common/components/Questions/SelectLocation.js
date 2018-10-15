import React, { Component } from 'react';
import { Select, Input } from 'antd';
import styles from './SelectLocation.module.css';

export default class SelectQuestion extends Component {
    state = {
        province: {},
        city: {},
        address: ''
    };

    componentDidMount() {
        const { answers, question } = this.props;
        if (answers[question._id]) {
            if (answers[question._id].province) {
                this.setState({
                    province: answers[question._id].province
                });
            }
            if (answers[question._id].city) {
                this.setState({
                    city: answers[question._id].city
                });
            }

            if (answers['address'] && answers['address'].text_option) {
                this.setState({
                    address: answers['address'].text_option
                });
            }
        }
    }


    handleChangeProvince = (province) => {
        const { provinces } = this.props;
        const selectedProvince = provinces.find(item => item.name === province);
        this.setState({
            province: selectedProvince,
            city: {}
        });
        this.generateAnswer(selectedProvince, this.state.city);
    };

    handleChangeCity = (city) => {
        const selectedCity = this.state.province.cities.find(item => item.name === city);
        this.setState({
            city: selectedCity
        });
        this.generateAnswer(this.state.province, selectedCity)
    };

    generateAnswer = (province, city) => {
        const { question, setAnswer } = this.props;
        const answer = {
            province,
            city
        };
        setAnswer(question._id, answer);
    };

    onChangeTextOption = (e) => {
        this.setState({
            address: e.target.value
        });
        const answer = {
            selected_options: [],
            text_option: e.target.value
        };
        this.props.setAnswer('address', answer);
    };

    render() {
        const { question, provinces, loading, loaded } = this.props;
        const { city, province } = this.state;
        console.log(this.state, 'this is state of locationnnnnnnn');
        return (
            <div>
                {
                    loading && !loaded ? <p>loading..</p> : null
                }
                {
                    !loading && loaded ? <div>
                        <p className={styles.title}>{question.title}</p>
                        <div className={styles.selectWrapper}>
                            <Select placeholder="استان خود را انتخاب کنید." style={{ width: 200 }}
                                    defaultValue={province.name}
                                    key={province.name}
                                    onChange={this.handleChangeProvince}
                            >
                                {
                                    provinces.map(item => {
                                        return <Select.Option value={item.name}>{item.name}</Select.Option>;
                                    })
                                }
                            </Select>
                        </div>
                    </div> : null
                }
                {
                    province && province.cities && province.cities.length ?
                        <div className={styles.selectWrapper}>
                            <Select placeholder="شهر خود را انتخاب کنید." style={{ width: 200 }}
                                    onChange={this.handleChangeCity}
                                    defaultValue={city.name}
                                    key={city.name}
                            >
                                {
                                    province.cities.map(item => {
                                        return <Select.Option value={item.name}>{item.name}</Select.Option>;
                                    })
                                }
                            </Select>
                        </div> : null
                }
                {
                    city && city.name ? <div className={styles.inputWrapper}>
                        <Input
                            placeholder="محدوده خود را وارد کنید."
                            onChange={this.onChangeTextOption}
                            value={this.state.address}
                        />
                    </div> : null
                }
            </div>
        );
    }
}