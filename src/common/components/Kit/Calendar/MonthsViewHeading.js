import React from 'react';
import PropTypes from 'prop-types';
import { persianNumber } from '../../../utils/persian';
import { leftArrow, rightArrow } from '../../../utils/assets';

export default function MonthsViewHeading(props) {
    const { year, styles, onNextYear, onPrevYear } = props;

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
                onClick={onPrevYear}
                dangerouslySetInnerHTML={rightArrow}
            />
            <button
                type="button"
                title="سال بعد"
                style={styles.navButton}
                className={styles.next}
                onClick={onNextYear}
                dangerouslySetInnerHTML={leftArrow}
            />
        </div>
    );
}

MonthsViewHeading.propTypes = {
    year: PropTypes.objectOf(PropTypes.any).isRequired,
    styles: PropTypes.objectOf(PropTypes.any),
    onNextYear: PropTypes.func.isRequired,
    onPrevYear: PropTypes.func.isRequired
};

MonthsViewHeading.defaultProps = {
    styles: {}
};
