import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Input } from 'antd';
import styles from './SelectLocation.module.styl';

export default class SelectQuestion extends Component {
    static propTypes = {
        question: PropTypes.objectOf(PropTypes.any).isRequired,
        answers: PropTypes.objectOf(PropTypes.any).isRequired,
        setAnswer: PropTypes.func.isRequired,
        provinces: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        loaded: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
        onEnter: PropTypes.func.isRequired
    };

    state = {
        province: {},
        city: {},
        address: ''
    };

    onKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.props.onEnter();
        }
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
            city: selectedProvince.cities[0]
        });
        this.generateAnswer(selectedProvince, selectedProvince.cities[0]);
    };

    handleChangeCity = (city) => {
        const selectedCity = this.state.province.cities.find(item => item.name === city);
        this.setState({
            city: selectedCity
        });
        this.generateAnswer(this.state.province, selectedCity);
    };

    generateAnswer = (province, city) => {
        const { question, setAnswer } = this.props;
        province.id = province._id;
        city.id = city._id;
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
        return (
            <div>
                {
                    loading && !loaded ? <p>loading..</p> : null
                }
                {
                    !loading && loaded ? <div>
                        <p className={styles.title}>{question.title}</p>
                        <div className={styles.row}>
                            <label htmlFor="questionsSelectProvince" className={styles.label}>
                                استان خود را انتخاب کنید
                            </label>
                            <Select
                                showSearch
                                placeholder="مثال: تهران"
                                onInputKeyDown={this.onInputKeyDown}
                                className={styles.select}
                                required
                                defaultValue={province.name}
                                key={province.name}
                                autoFocus
                                onChange={this.handleChangeProvince}
                                notFoundContent={'موردی پیدا نشد'}
                            >
                                {
                                    provinces.map((item) => {
                                        return (<Select.Option
                                            key={item.name}
                                            value={item.name}
                                        >
                                            {item.name}
                                        </Select.Option>);
                                    })
                                }
                            </Select>
                        </div>
                    </div> : null
                }
                {
                    province && province.cities && province.cities.length ?
                        <div className={styles.row}>
                            <label htmlFor="questionsSelectCity" className={styles.label}>
                                شهر خود را انتخاب کنید
                            </label>
                            <Select
                                showSearch
                                placeholder="مثال: تهران"
                                onInputKeyDown={this.onInputKeyDown}
                                onChange={this.handleChangeCity}
                                required
                                value={city.name}
                                key={city.name}
                                className={styles.select}
                                id="questionsSelectCity"
                                name="questionsSelectCity"
                                notFoundContent={'موردی پیدا نشد'}
                            >
                                {
                                    province.cities.map((item) => {
                                        return (<Select.Option
                                            value={item.name}
                                            key={item.name}
                                        >
                                            {item.name}
                                        </Select.Option>);
                                    })
                                }
                            </Select>
                        </div> : null
                }
                {
                    city && city.name ? <div className={styles.row}>
                        <label htmlFor="questionsAddress" className={styles.label}>
                            محدوده خود را وارد کنید
                        </label>
                        <Input
                            id="questionsAddress"
                            onChange={this.onChangeTextOption}
                            value={this.state.address}
                            required
                        />
                    </div> : null
                }
            </div>
        );
    }
}
