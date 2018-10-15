import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Day of week names for use in date-picker heading
const dayOfWeekNames = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

export default class DaysOfWeek extends Component {
    static propTypes = {
        styles: PropTypes.objectOf(PropTypes.any)
    };

    static defaultProps = {
        styles: {}
    };

    render() {
        const { styles } = this.props;

        return (
            <div className={styles.daysOfWeek}>
                {dayOfWeekNames.map(name => <div key={name}>{name}</div>)}
            </div>
        );
    }
}
