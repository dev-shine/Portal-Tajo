import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import {
  makeTimeRangeParams,
} from 'utils/dateTimeUtils';
import dealerSelectors from 'services/Dealer/selectors';


export const UPDATE_FLEET_OWERVIEW = 'upFleetOverView';
export const UPDATE_FLEET_FUEL = 'upFleetFuel';

export const fetchFleetOverview = timeRange => (dispatch, getState) => {
  const params = { ...makeTimeRangeParams(timeRange.fromDate, timeRange.toDate),
    tzoffset: 0,
  };
  const selectedSubFleet = dealerSelectors.getSelectedSubFleet(getState());
  if (selectedSubFleet) {
    params.subFleetId = selectedSubFleet;
  }
  _fetchFleetOverview(params, dispatch);
  _fetchFleetFuel(params, dispatch);
};

const _fetchFleetOverview = (params, dispatch) => {
  const { url, method } = endpoints.getFleetOverview(params);

  // dispatch(fleetIsReady(false));

  api[method](url)
    .then(response => response.json())
    .then((overview) => {
      dispatch(_setFleetOverviewData(overview));
    });
  // return Promise.resolve({ ready: true });
  // dispatch(_setFleetOverviewData());
};

const _fetchFleetFuel = (params, dispatch) => {
  const { url, method } = endpoints.getFleetFuel(params);

  api[method](url)
    .then(response => response.json())
    .then((overview) => {
      dispatch(_setFleetFuelData(overview));
    });
};


const _setFleetOverviewData = data => ({
  type: UPDATE_FLEET_OWERVIEW,
  avgSpeed: data.avgSpeed,
  idleOver30Min: data.idleOver30Min,
  idleUnder30Min: data.idleUnder30Min,
  normalDriving: data.normalDriving,
  totalDistance: data.totalDistance,
  totalDrivingTime: data.totalDrivingTime,
  totalIdleTime: data.totalIdleTime,
  totalRunningTime: data.totalRunningTime,
  vehicleCount: data.vehicleCount,
});

const _setFleetFuelData = overview => ({
  type: UPDATE_FLEET_FUEL,
  totalFuel: overview.totalConsumption,
});
