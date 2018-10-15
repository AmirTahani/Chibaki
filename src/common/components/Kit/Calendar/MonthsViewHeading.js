import React from 'react';
import PropTypes from 'prop-types';
import { persianNumber } from '../../../utils/persian';
import { leftArrow, rightArrow } from '../../../utils/assets';

export default function MonthsViewHeading(props) {
    const { year, styles } = props;

    return (
        <div className={styles.heading}>
            <span className={styles.title}>
                {
                    persianNumber(year.format('jYYYY'))
                }
            </span>
            <button
                type="button"
                title="سال قبل"
                style={styles.navButton}
                className={styles.prev}
                onClick={this.props.onPrevYear}
                dangerouslySetInnerHTML={rightArrow}
            />
            <button
                type="button"
                title="سال بعد"
                style={styles.navButton}
                className={styles.next}
                onClick={this.props.onNextYear}
                dangerouslySetInnerHTML={leftArrow}
            />
        </div>
    );
}

MonthsViewHeading.propTypes = {
    year: PropTypes.objectOf(PropTypes.any).isRequired,
    styles: PropTypes.objectOf(PropTypes.any)
};

MonthsViewHeading.defaultProps = {
    styles: {}
};
