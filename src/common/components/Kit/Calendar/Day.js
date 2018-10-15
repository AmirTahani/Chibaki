import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { persianNumber } from '../../../utils/persian';

export default class Day extends Component {
    static propTypes = {
        day: PropTypes.objectOf(PropTypes.any).isRequired,
        isCurrentMonth: PropTypes.bool.isRequired,
        disabled: PropTypes.bool.isRequired,
        selected: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        styles: PropTypes.objectOf(PropTypes.any)
    };

    static defaultProps = {
        styles: {}
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.selected !== this.props.selected ||
            nextProps.disabled !== this.props.disabled ||
            nextProps.isCurrentMonth !== this.props.isCurrentMonth;
    }

    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        const { onClick, day } = this.props;

        if (onClick) {
            onClick(day);
        }
    }

    render() {
        const { day, disabled, selected, isCurrentMonth, styles, ...rest } = this.props;

        const className = classnames(styles.dayWrapper, {
            [styles.selected]: selected,
            [styles.currentMonth]: isCurrentMonth
        });

        return (
            <div className={className}>
                <button
                    type="button"
                    onClick={this.handleClick.bind(this)}
                    disabled={disabled}
                    {...rest}
                >
                    {persianNumber(day.format('jD'))}
                </button>
            </div>
        );
    }
}
