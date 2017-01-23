import React from 'react';
import { isEscape } from 'configs';
import { css } from 'aphrodite/no-important';
import EventsCalculator from 'containers/EventsCalculator';
import FleetSummary from 'containers/FleetSummary';
import WidgetsGroup from './components/WidgetsGroup';
import classes from './classes';

function canShow(Component) {
  if (Component === EventsCalculator) {
    return false && isEscape;
  }

  if (Component === FleetSummary) {
    return true;
  }

  return false;
}

function renderGroup(component) {
  return (
    <WidgetsGroup
      containerClass={classes.dashboard__summaryGroup}
      title="Fleet Summary"
    >
      { component }
    </WidgetsGroup>
  );
}

const DashboardScreen = () => (
  <div className={css(classes.dashboard)}>
    { canShow(EventsCalculator) && <EventsCalculator /> }
    { canShow(FleetSummary) && renderGroup(<FleetSummary />) }
  </div>
);

export default DashboardScreen;
