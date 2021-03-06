import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import pure from 'recompose/pure';
import { showSnackbar } from 'containers/Snackbar/actions';
import OfflineDataList from '../OfflineDataList';
import { getOfflineData } from 'containers/Installer/reducer';
import { translate } from 'utils/i18n';

import phrases, { phrasesShape } from './PropTypes';

class OfflineData extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      indexes: new List(),
    };

    this.cleanChecked = this.cleanChecked.bind(this);
    this.sendChecked = this.sendChecked.bind(this);
  }

  toggleSaving = (checked, index) => {
    const state = this.state.indexes;
    let nextState;

    if (checked) {
      nextState = state.push(index);
    } else {
      nextState = state.delete(index);
    }

    this.setState({
      indexes: nextState,
    });
  }

  sendChecked = () => {
    this.props.sendData(this.state.indexes.toArray())
    .then(() => {
      this.props.showSnackbar(this.props.translations.send_success, 2000);
      this.resetIndexes();
    }, () => {
      this.props.showSnackbar(this.props.translations.send_fail, 2000);
    });
  }

  cleanChecked = () => {
    this.props.cleanData(this.state.indexes.toArray())
    .then(() => {
      this.props.showSnackbar(this.props.translations.clean_success, 2000);
      this.resetIndexes();
    });
  }

  resetIndexes() {
    this.setState({
      indexes: new List(),
    });
  }

  render() {
    if (this.props.data.size === 0) return null;

    return (
      <OfflineDataList
        cleanData={this.cleanChecked}
        data={this.props.data}
        indexes={this.state.indexes.toArray()}
        isOnline={this.props.isOnline}
        sendData={this.sendChecked}
        toggleSaving={this.toggleSaving}
      />
    );
  }
}

OfflineData.propTypes = {
  cleanData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isOnline: PropTypes.bool.isRequired,
  sendData: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func.isRequired,

  translations: phrasesShape.isRequired,
};
OfflineData.defaultProps = {
  translations: phrases,
};

const mapState = (state) => ({
  data: getOfflineData(state),
});
const mapDispatch = {
  showSnackbar,
};

const PureOfflineData = pure(OfflineData);
const Connected = connect(mapState, mapDispatch)(PureOfflineData);

export default translate(phrases)(Connected);
