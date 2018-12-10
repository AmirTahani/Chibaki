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
        fieldClassName: PropTypes.string,
        btnClassName: PropTypes.string,
        btnContent: PropTypes.node,
        wrapInForm: PropTypes.bool,
        className: PropTypes.string
    };

    static defaultProps = {
        showBtn: true,
        placeholder: 'به چه خدمتی نیاز دارید؟',
        children: null,
        valueAs: '_id',
        defaultValue: {},
        showOptionsWhenEmpty: false,
        fieldName: '',
        fieldClassName: '',
        btnClassName: '',
        btnContent: null,
        wrapInForm: true,
        className: ''
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
        if (typeof value !== 'undefined') {
            this.setState({
                selectedValue: ''
            });
            this.engineConf.search(value,
                (options) => {
                    this.setState({
                        options
                    });
                }
            );
        } else if (this.props.showOptionsWhenEmpty) {
            this.setState({
                options: this.props.options
            });
        }
    };

    renderOption = (item) => {
        const { valueAs } = this.props;
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
        const { showBtn, onSubmit } = this.props;
        this.setState({
            selectedValue
        });
        if (!showBtn) {
            onSubmit(selectedValue);
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
            fieldClassName,
            wrapInForm,
            className,
            btnClassName,
            dropdownClassName,
            btnContent,
            ...rest
        } = this.props;
        const { options } = this.state;
        const Wrapper = wrapInForm ? 'form' : 'div';

        return (
            <Wrapper className={`${styles.wrapper} c-autocomplete ${className}`} onSubmit={this.handleFormSubmit}>
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
                    className={styles.field}
                >
                    {children || <input
                        type="text"
                        name={fieldName}
                        id={fieldName}
                        className={`${styles.input} ${fieldClassName}`}
                        value={defaultValue[valueAs]}
                        required
                    />}
                </AntAutoComplete>
                <button
                    type="submit"
                    onClick={() => onSubmit(this.state.selectedValue)}
                    className={`${styles.btn} ${!showBtn ? styles.hide : ''} ${btnClassName}`}
                >
                    {btnContent || 'ادامه'}
                </button>
            </Wrapper>
        );
    }
}
