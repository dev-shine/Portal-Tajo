import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import {
  checkUserAuthentication,
  setFleet,
} from './actions';
import { deepOrange500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import createBaseUrl from 'utils/createBaseUrl';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class App extends React.Component {

  componentWillMount() {
    this.props.setFleet(this.props.fleet);
  }

  componentDidMount() {
    this.props.checkUserAuthentication(this.props.urls);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

App.propTypes = {
  checkUserAuthentication: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
  fleet: React.PropTypes.string.isRequired,
  urls: React.PropTypes.shape({
    success: React.PropTypes.string.isRequired,
    failure: React.PropTypes.string.isRequired,
  }).isRequired,
  setFleet: React.PropTypes.func.isRequired,
};

const mapState = (state, ownProps) => {
  const base = createBaseUrl(ownProps.params.fleet);

  return {
    fleet: ownProps.params.fleet,
    urls: {
      success: `${base}/dashboard`,
      failure: `${base}/login`,
    },
  };
};
const mapDispatch = {
  checkUserAuthentication,
  setFleet,
};

const PureApp = pure(App);

export default connect(mapState, mapDispatch)(PureApp);
