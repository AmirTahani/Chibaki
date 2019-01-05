import { AutoComplete as AntAutoComplete } from 'antd';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import React, { Component } from 'react';
import Bloodhound from 'bloodhound-js';

import styles from './AutoComplete.module.styl';

const Option = AntAutoComplete.Option;

export default class AutoComplete extends Component {
    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        onSubmit: PropTypes.func.isRequired,
        showBtn: PropTypes.bool,
        placeholder: PropTypes.string,
        children: PropTypes.node,
        valueAs: PropTypes.string,
        defaultValue: PropTypes.objectOf(PropTypes.any),
        showOptionsWhenEmpty: PropTypes.bool,
        fieldName: PropTypes.string,
        inputClassName: PropTypes.string,
        fieldClassName: PropTypes.string,
        btnClassName: PropTypes.string,
        btnContent: PropTypes.node,
        dropdownClassName: PropTypes.string,
        wrapInForm: PropTypes.bool,
        wrapperClassName: PropTypes.string
    };

    static defaultProps = {
        showBtn: true,
        placeholder: 'به چه خدمتی نیاز دارید؟',
        children: null,
        valueAs: '_id',
        defaultValue: {},
        showOptionsWhenEmpty: false,
        fieldName: '',
        inputClassName: '',
        fieldClassName: '',
        btnClassName: '',
        btnContent: null,
        dropdownClassName: '',
        wrapInForm: true,
        wrapperClassName: ''
    };

    state = {
        options: [],
        selectedValue: ''
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
        this.setState({
            selectedValue: '',
            options: []
        });
        if (value) {
            this.engineConf.search(value, (options) => {
                this.setState({
                    options
                });
            });
        } else if (this.props.showOptionsWhenEmpty) {
            this.setState({
                options: this.props.options
            });
        }
    };

    renderOption = (item) => {
        const { valueAs } = this.props;
        if (valueAs === 'obj') {
            return (
                <Option
                    key={JSON.stringify(item)}
                    text={item.title}
                >
                    {item.title}
                </Option>
            );
        }
        return (
            <Option
                key={item[valueAs]}
                text={item.title}
            >
                {item.title}
            </Option>
        );
    };

    handleSelect = (selectedValue) => {
        const { showBtn, onSubmit, valueAs } = this.props;
        this.setState({
            selectedValue
        });
        if (!showBtn) {
            return valueAs === 'obj' ? onSubmit(JSON.parse(selectedValue)) : onSubmit(selectedValue);
        }
    };

    validateInput = (value) => {
        if (!value) {
            ReactDom.findDOMNode(this.inputRef).setCustomValidity('تخصص خود را انتخاب کنید!');
        } else if (value) {
            ReactDom.findDOMNode(this.inputRef).setCustomValidity('');
        } else {
            ReactDom.findDOMNode(this.inputRef).setCustomValidity('تخصص خود را به درستی انتخاب کنید!');
        }
    };

    handleFormSubmit = (e) => {
        e.preventDefault();

        return false;
    };
    handleButtonSelect = () => {
        const { valueAs, onSubmit } = this.props;
        const { selectedValue } = this.state;
        return valueAs === 'obj' ? onSubmit(JSON.parse(selectedValue)) : onSubmit(selectedValue);
    };

    componentDidMount() {
        this.engine = this.engineConf.initialize();
        if (this.props.showOptionsWhenEmpty && !this.props.defaultValue[this.props.valueAs]) {
            this.setState({
                options: this.props.options
            });
        }
    }

    render() {
        const {
            onSubmit,
            showBtn,
            placeholder,
            children,
            defaultValue,
            valueAs,
            fieldName,
            inputClassName,
            fieldClassName,
            wrapInForm,
            wrapperClassName,
            btnClassName,
            dropdownClassName,
            btnContent,
            ...rest
        } = this.props;
        const { options } = this.state;
        const Wrapper = wrapInForm ? 'form' : 'div';

        return (
            <Wrapper
                className={`${styles.wrapper} c-autocomplete ${wrapperClassName}`}
                onSubmit={this.handleFormSubmit}
            >
                <AntAutoComplete
                    defaultValue={defaultValue[valueAs]}
                    dataSource={options.map(
                        this.renderOption
                    )}
                    {...rest}
                    style={{ width: '100%' }}
                    onSearch={
                        this.handleChange
                    }
                    onSelect={this.handleSelect}
                    placeholder={placeholder}
                    className={`${styles.field} ${fieldClassName}`}
                >
                    {children || <input
                        type="text"
                        name={fieldName}
                        id={fieldName}
                        className={`${styles.input} ${inputClassName}`}
                        value={defaultValue[valueAs]}
                        required
                    />}
                </AntAutoComplete>
                <button
                    type="submit"
                    onClick={this.handleButtonSelect}
                    className={`${styles.btn} ${!showBtn ? styles.hide : ''} ${btnClassName}`}
                >
                    {btnContent || 'ادامه'}
                </button>
            </Wrapper>
        );
    }
}
