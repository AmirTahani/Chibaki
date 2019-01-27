import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import classnames from 'classnames';
import moment from 'moment-jalali';
import TetherComponent from 'react-tether';
import Calendar from './Calendar';

export const outsideClickIgnoreClass = 'ignore--click--outside';

export default class DatePicker extends Component {
    static propTypes = {
        value: PropTypes.objectOf(PropTypes.any).isRequired,
        defaultValue: PropTypes.objectOf(PropTypes.any).isRequired,
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func,
        min: PropTypes.objectOf(PropTypes.any).isRequired,
        max: PropTypes.objectOf(PropTypes.any).isRequired,
        defaultMonth: PropTypes.objectOf(PropTypes.any).isRequired,
        inputFormat: PropTypes.string,
        timePickerComponent: PropTypes.func.isRequired,
        calendarStyles: PropTypes.objectOf(PropTypes.any).isRequired,
        calendarContainerProps: PropTypes.objectOf(PropTypes.any).isRequired,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        inputPlaceholder: PropTypes.string
    };

    static defaultProps = {
        inputFormat: 'jYYYY/jM/jD',
        calendarStyles: require('./style.module.styl'),
        calendarContainerProps: {},
        onBlur: () => {
        },
        className: '',
        disabled: false,
        inputPlaceholder: ''
    };

    state = {
        isOpen: false,
        isTetherEnabled: true,
        momentValue: this.props.defaultValue || null,
        inputValue: this.props.defaultValue ?
            this.props.defaultValue.format(this.props.inputFormat) : ''
    };

    componentDidMount() {
        this.handleResize();
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && nextProps.value !== this.props.value) {
            this.setMomentValue(nextProps.value);
        }
    }

    setOpen(isOpen) {
        this.setState({ isOpen });
    }

    setMomentValue(momentValue) {
        const { inputFormat } = this.props;

        if (this.props.onChange) {
            this.props.onChange(momentValue);
        }

        let inputValue = '';
        if (momentValue) {
            inputValue = momentValue.format(inputFormat);
        }
        this.setState({ momentValue, inputValue });
    }

    handleFocus() {
        this.setOpen(true);
    }

    handleBlur(event) {
        const { onBlur, inputFormat } = this.props;
        const { isOpen, momentValue } = this.state;

        if (isOpen) {
            this.refs.input.focus();
        } else if (onBlur) {
            onBlur(event);
        }

        if (momentValue) {
            const inputValue = momentValue.format(inputFormat);
            this.setState({ inputValue });
        }
    }

    handleClickOutsideCalendar() {
        this.setOpen(false);
    }

    handleSelectDay(selectedDay) {
        const { momentValue: oldValue } = this.state;
        let momentValue = selectedDay.clone();

        if (oldValue) {
            momentValue = momentValue
                .set({
                    hour: oldValue.hours(),
                    minute: oldValue.minutes(),
                    second: oldValue.seconds()
                });
        }

        this.setOpen(false);
        this.setMomentValue(momentValue);
    }

    handleResize() {
        if (typeof document !== 'undefined') {
            if (document.documentElement.clientWidth > 480) {
                this.setState({
                    isTetherEnabled: true
                });
            } else {
                this.setState({
                    isTetherEnabled: false
                });
            }
        }
    }

    handleInputChange(event) {
        const { inputFormat } = this.props;
        const inputValue = event.target.value;
        const momentValue = moment(inputValue, inputFormat);

        if (momentValue.isValid()) {
            this.setState({ momentValue });
        }

        this.setState({ inputValue });
    }

    handleInputClick() {
        if (!this.props.disabled) {
            this.setOpen(true);
        }
    }

    renderCalendar() {
        const { momentValue } = this.state;
        const { timePickerComponent: TimePicker, min, max, defaultMonth, calendarStyles, calendarContainerProps } = this.props;

        return (
            <div>
                <Calendar
                    min={min}
                    max={max}
                    selectedDay={momentValue}
                    defaultMonth={defaultMonth}
                    onSelect={this.handleSelectDay.bind(this)}
                    onClickOutside={this.handleClickOutsideCalendar.bind(this)}
                    outsideClickIgnoreClass={outsideClickIgnoreClass}
                    styles={calendarStyles}
                    containerProps={calendarContainerProps}
                >
                    {
                        TimePicker ? (
                            <TimePicker
                                min={min}
                                max={max}
                                momentValue={momentValue}
                                setMomentValue={this.setMomentValue.bind(this)}
                            />
                        ) : null
                    }
                </Calendar>
            </div>
        );
    }

    removeDate() {
        const { onChange } = this.props;
        if (onChange) {
            onChange('');
        }
        this.setState({
            input: '',
            inputValue: ''
        });
    }

    renderInput() {
        let { inputValue } = this.state;

        if (this.props.value) {
            const value = this.props.value;
            const inputFormat = this.props.inputFormat;
            inputValue = value.format(inputFormat);
        }

        const className = classnames(this.props.className, {
            [outsideClickIgnoreClass]: this.state.isOpen
        });

        return (
            <div>
                <Input
                    className={className}
                    type="text"
                    ref="input"
                    placeholder={this.props.inputPlaceholder}
                    onFocus={this.handleFocus.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    onChange={this.handleInputChange.bind(this)}
                    onClick={this.handleInputClick.bind(this)}
                    value={inputValue}
                />
            </div>
        );
    }

    render() {
        const { isOpen, isTetherEnabled } = this.state;

        return (
            <TetherComponent
                attachment="top center"
                enabled={isTetherEnabled}
                style={{ 'z-index': 10000 }}
                onResize={this.handleResize}
            >
                {this.renderInput()}
                {isOpen ? this.renderCalendar() : null}
            </TetherComponent>
        );
    }
}
