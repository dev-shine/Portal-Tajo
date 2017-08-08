import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import drvrDevTheme from 'configs/theme';
import phrases, { locales } from 'configs/phrases';
import { TranslationProvider } from 'utils/i18n';
import InnerPortal from 'containers/InnerPortal';

import 'font-awesome/css/font-awesome.css';
import './styles.css';

const DEF_LOCALE = 'en';

const CommonWrappers = ({ children }) => (
  <TranslationProvider
    phrases={phrases}
    locales={locales}
    locale={DEF_LOCALE}
  >
    <MuiThemeProvider muiTheme={drvrDevTheme}>
      {children}
    </MuiThemeProvider>
  </TranslationProvider>
);

CommonWrappers.propTypes = {
  children: PropTypes.element.isRequired,
};

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props.route.auth;

    // case for login screen
    if (!isAuthenticated()) {
      return (
        <CommonWrappers>
          { this.props.children }
        </CommonWrappers>
      );
    }

    return (
      <CommonWrappers>
        <InnerPortal auth={this.props.route.auth}>
          { this.props.children }
        </InnerPortal>
      </CommonWrappers>
    );
  }
}

App.propTypes = {
  route: PropTypes.shape({
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default App;