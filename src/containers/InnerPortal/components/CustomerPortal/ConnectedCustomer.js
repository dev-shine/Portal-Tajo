import { connect } from 'react-redux';
import { getFleetName } from 'services/Session/reducer';
import { getVehiclesStaticSlice } from 'services/FleetModel/reducer';
import { makeGetFleetIsReady } from 'services/FleetModel/selectors';
import { fetchDevices } from 'services/Devices/actions';
import {
  conditionsActions,
  journalActions,
} from 'services/AlertsSystem/actions';
import { makePeriodForLast24Hours } from 'utils/dateTimeUtils';
import CustomerPortal from './CustomerPortal';

const makeMapStateToProps = () => {
  const getIsReady = makeGetFleetIsReady();

  const mapState = (state) => {
    return {
      fleet: getFleetName(state),
      readyToShowPortal: getIsReady(getVehiclesStaticSlice(state)),
    };
  };

  return mapState;
};

const mapDispatch = (dispatch) => {
  return {
    fetchSpecificData: () => {
      dispatch(conditionsActions.fetchAlertConditions())
        .then(() => dispatch(journalActions.fetchNotifications(makePeriodForLast24Hours())))
        .then(() => dispatch(fetchDevices()));
    },
  };
};

export default connect(makeMapStateToProps, mapDispatch)(CustomerPortal);
