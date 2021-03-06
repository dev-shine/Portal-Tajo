import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import cs from 'classnames';
import { connect } from 'react-redux';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import { theme } from 'configs';
import { authorizeWithPermissions } from 'utils/authz';
import { deactivateDevice } from 'services/Devices/actions';

import styles from './styles.css';

const STYLES = {
  warningicon: {
    height: 20,
    width: 20,
  },
};

const canDeactivateDevice = () => authorizeWithPermissions('delete:device');

function renderActions(onDiactivate) {
  return (
    <CardActions className={styles.actions}>
      <FlatButton
        disabled
        label="Deactivate (back not ready)"
        onClick={onDiactivate}
      />
    </CardActions>
  );
}

// const vehicleNotCorrectText = id => ;
const deviceNotAttached = 'Not attached to any vehicle';
const ErrorText = ({ children }) => <div className={styles.error}>{children}</div>;

ErrorText.propTypes = {
  children: PropTypes.any.isRequired, // eslint-disable-line
};

// show warning if device not attached
// or no such vehicle
const Status = ({
  notAttached,
  vehicleIsFault,
}) => {
  // attached and id is correct
  if (!notAttached && !vehicleIsFault) {
    return null;
  }

  let title = '';

  if (notAttached) {
    title = deviceNotAttached;
  } else if (vehicleIsFault) {
    title = 'No such vehicle in fleet';
  }

  return (
    <div
      className={styles.warning}
      title={title}
    >
      <WarningIcon
        color={theme.palette.accent1Color}
        style={STYLES.warningicon}
      />
    </div>
  );
};

Status.propTypes = {
  notAttached: PropTypes.bool.isRequired,
  vehicleIsFault: PropTypes.bool.isRequired,
};

// show vehicle name if device attached
const Text = ({
  vehicleId,
  vehicleName,
  notAttached,
  vehicleIsFault,
}) => {
  let text = vehicleName;

  if (notAttached) {
    text = <ErrorText>{deviceNotAttached}</ErrorText>;
  } else if (vehicleIsFault) {
    text = (
      <ErrorText>
        No such vehicle with id:<br />
        {vehicleId}
      </ErrorText>
    );
  }

  return (
    <CardText>
      { text }
    </CardText>
  );
};

Text.propTypes = {
  vehicleId: PropTypes.string,
  vehicleName: PropTypes.string,
  notAttached: PropTypes.bool.isRequired,
  vehicleIsFault: PropTypes.bool.isRequired,
};

class Device extends React.Component {

  onDiactivate = () => {
    const { deactivateDevice, ...rest } = this.props; // eslint-disable-line

    deactivateDevice(rest);
  }

  render() {
    const cardClassName = cs(styles.card, {
      [styles.card_withActions]: canDeactivateDevice(),
    });

    return (
      <div className={styles.deviceContainer}>
        <Card className={cardClassName}>
          <CardHeader
            title={this.props.original.sn}
            subtitle={this.props.original.kind}
          />
          <Text
            notAttached={this.props.notAttached}
            vehicleId={this.props.original.vehicleId}
            // vehicleName={this.props.vehicleName}
            vehicleIsFault={this.props.vehicleIsFault}
          />
          { canDeactivateDevice() && renderActions(this.onDiactivate) }
        </Card>

        <Status
          notAttached={this.props.notAttached}
          vehicleIsFault={this.props.vehicleIsFault}
        />
      </div>
    );
  }
}

Device.propTypes = {
  // device id
  id: PropTypes.string.isRequired,

  // true if don't has vehicleId
  notAttached: PropTypes.bool.isRequired,

  // true, if no such vehicle in fleet
  vehicleIsFault: PropTypes.bool.isRequired,

  // name of assotiated vehicle
  // vehicleName: PropTypes.string.isRequired,

  // original properties from backend
  original: PropTypes.shape({
    // device id
    id: PropTypes.string.isRequired,
    // serial-number or imei.
    // Usually equal to id
    sn: PropTypes.string.isRequired,

    // device model
    kind: PropTypes.string,

    // could be active or not
    status: PropTypes.oneOf(['active']),

    // id of vehicle device attached to
    // could be undefined
    vehicleId: PropTypes.string,
  }).isRequired,

  // callback on deactivate
  deactivateDevice: PropTypes.func.isRequired,
};

const mapState = null;
const mapDispatch = {
  deactivateDevice,
};

const PureDevice = pure(Device);

export default connect(mapState, mapDispatch)(PureDevice);
