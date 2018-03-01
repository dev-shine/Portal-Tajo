import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';
import FlatButton from 'material-ui/FlatButton';
import tinycolor from 'tinycolor2';
import { makePeriodForHoursBack } from 'utils/dateTimeUtils';

import { DateRangeWithButton } from 'components/DateRange';
import { theme } from 'configs';


const classes = StyleSheet.create({
  header: {
    padding: '20px 40px',
    backgroundColor: '#fff',
    borderBottom: '1px solid rgba(0, 0, 0, 0.07)',
    margin: '0 -20px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
  },
  text: {
    fontSize: 20,
    fontWeight: 'normal',
    lineHeight: '100%',
    padding: '5px 0px',
    color: tinycolor(theme.layout.headerColor).setAlpha(0.45).toString(),
  },
  actions: {
  },
});

const PageHeader = ({ text, onApply, hasDateSelector, defaultTimeRange }) => (
  <div className={css(classes.header)}>
    <div className={css(classes.text)}>
      { text }
    </div>
    {hasDateSelector && <div className={css(classes.actions)}>
      {
        defaultTimeRange.fromDate === undefined ?
          <DateRangeWithButton
            withTime={false}
            onApply={onApply}
            fromDate={makePeriodForHoursBack(30 * 24).fromDate}
            toDate={makePeriodForHoursBack(30 * 24).toDate}
            button={(
              <FlatButton
                primary
                label="apply"
              />
            )}
          />
          :
          <DateRangeWithButton
            withTime={false}
            onApply={onApply}
            fromDate={defaultTimeRange.fromDate}
            toDate={defaultTimeRange.toDate}
            button={(
              <FlatButton
                primary
                label="apply"
              />
            )}
          />
      }
    </div>}
  </div>
);

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
  onApply: PropTypes.func.isRequired,
  hasDateSelector: PropTypes.bool,
  defaultTimeRange: PropTypes.object,
};

PageHeader.defaultProps = {
  hasDateSelector: true,
  // by default - query one month back
  defaultTimeRange: makePeriodForHoursBack(30 * 24),
};


export default PageHeader;
