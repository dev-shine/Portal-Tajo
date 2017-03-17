import React from 'react';
import pure from 'recompose/pure';
import { withRouter } from 'react-router';
import locationShape from 'react-router/lib/PropTypes';
import { connect } from 'react-redux';
import { AppBar, FlatButton } from 'material-ui';
import { BASE_URL, isEscape } from 'configs';
import CodebaseVersion from 'components/CodebaseVersion';
import { changeMainSidebarState } from 'containers/InnerPortal/actions';
import FleetSummary from 'containers/FleetSummary';
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

const hideSummaryOn = [
  `${BASE_URL}review`,
  `${BASE_URL}dashboard`,
  isEscape && BASE_URL,
];

const STYLES = {
  title: {
    lineHeight: 'inherit',
  },
};

function renderSummary(location) {
  const hide = hideSummaryOn.indexOf(location.pathname) !== -1;

  if (hide) {
    return null;
  }

  return (
    <div className={styles.centerContainer}>
      <FleetSummary simple />
    </div>
  );
}

function renderTitle(title) {
  return (
    <div className={styles.title}>
      { title }
      <CodebaseVersion />
    </div>
  );
}

const ApplicationBar = ({
  title,
  toggleSidebar,
  location,
  translations,
}, {
  logout,
}) => (
  <div className={styles.barContainer}>
    <AppBar
      title={renderTitle(title)}
      iconElementRight={
        <FlatButton
          label={ translations.logout }
          onClick={logout}
        />
      }
      titleStyle={STYLES.title}
      className={styles.bar}
      zDepth={0}
      onLeftIconButtonTouchTap={toggleSidebar}
      children={ renderSummary(location) }
    />
  </div>
);

ApplicationBar.contextTypes = {
  logout: React.PropTypes.func.isRequired,
};

ApplicationBar.propTypes = {
  title: React.PropTypes.string.isRequired,
  toggleSidebar: React.PropTypes.func.isRequired,
  location: React.PropTypes.shape(locationShape).isRequired,

  translations: phrasesShape.isRequired,
};
ApplicationBar.defaultProps = {
  translations: phrases,
};

const mapState = null;
const mapDispatch = {
  toggleSidebar: changeMainSidebarState,
};

const PureApplicationBar = pure(withRouter(ApplicationBar));

const Connected = connect(mapState, mapDispatch)(PureApplicationBar);

export default translate(phrases)(Connected);
