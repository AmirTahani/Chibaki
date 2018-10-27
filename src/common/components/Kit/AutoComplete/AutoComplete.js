import { AutoComplete as AntAutoComplete } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Bloodhound from 'bloodhound-js';

import styles from './AutoComplete.module.styl';

const Option = AntAutoComplete.Option;

export default class AutoComplete extends Component {
    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        onSubmit: PropTypes.func.isRequired,
        showBtn: PropTypes.bool,
        placeholder: PropTypes.string
    };

    static defaultProps = {
        showBtn: true,
        placeholder: 'به چه خدمتی نیاز دارید؟'
    };

    state = {
        options: [],
    };
    engineConf = new Bloodhound({
        initialize: true,
        local: this.props.options,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        datumTokenizer: obj =>
            Bloodhound.tokenizers.whitespace(
                obj.title
            ),
        identify: obj => obj._id
    });
    handleChange = (value) => {
        this.engineConf.search(value,
            (options) => {
                this.setState({
                    options
                });
            }
        );
    };
    renderOption = (item) => {
        return (
            <Option
                key={item._id}
                text={item.title}
            >
                {item.title}
            </Option>
        );
    };

    componentDidMount() {
        this.engine = this.engineConf.initialize();
    }

    render() {
        const { onSubmit, showBtn, placeholder } = this.props;
        const { options } = this.state;

        return (
            <div className={`${styles.wrapper} c-autocomplete`}>
                <div className={styles.form}>
                    <AntAutoComplete
                        dataSource={options.map(
                            this.renderOption
                        )}
                        style={{ width: '100%' }}
                        onSearch={
                            this.handleChange
                        }
                        onSelect={onSubmit}
                        placeholder={placeholder}
                        className={styles.field}
                    >
                        <input
                            type="text"
                            className={styles.input}
                        />
                    </AntAutoComplete>
                    {
                        showBtn && <button className={styles.btn}>
                            ادامه
                        </button>
                    }
                </div>
            </div>
        );
    }
}
