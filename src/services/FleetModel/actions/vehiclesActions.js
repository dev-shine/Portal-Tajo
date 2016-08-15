import api from 'utils/api';
import { openFleetSocket } from './socketActions';
import {
  getFleetName,
  getAuthenticationSession,
} from 'containers/App/reducer';
import processVehicels from '../utils/vehicleHelpers';

export const FLEET_MODEL_VEHICLES_SET = 'portal/services/FLEET_MODEL_VEHICLES_SET';
export const FLEET_MODEL_VEHICLES_FILTER = 'portal/services/FLEET_MODEL_VEHICLES_FILTER';
export const FLEET_MODEL_VEHICLE_UPDATE = 'portal/services/FLEET_MODEL_VEHICLE_UPDATE';

export const fetchVehicles = (fleet, openWebSocket) => (dispatch, getState) =>
  _fetchVehicles(fleet, openWebSocket, dispatch, getState);
export const updateDetails = (details = {}, index) => (dispatch, getState) =>
  makeUpdateVehicleRequest(details, index, dispatch, getState);
export const filterVehicles = (filterName) => (dispatch) =>
  dispatch(_vehiclesFilter(filterName));

/**
 * fleet is optional
 **/
function _fetchVehicles(fleetName, openWebSocket, dispatch, getState) {
  const fleet = fleetName || getFleetName(getState());
  const url = `${fleet}/vehicles`;
  const sessionId = getAuthenticationSession(getState());
  const optionalHeaders = {
    ['DRVR-SESSION']: sessionId,
  };

  return api(url, { optionalHeaders })
    .then(toJson)
    .then(vehicles => {
      const localVehicles = processVehicels(vehicles);
      dispatch(_vehiclesSet(vehicles, localVehicles));

      if (openWebSocket) {
        dispatch(openFleetSocket(fleet));
      }
    });
}

/**
 * PUT new updated details to the server
 **/
export function makeUpdateVehicleRequest(details, index, dispatch, getState) {
  const fleet = getFleetName(getState());
  const url = `${fleet}/vehicles/${details.id}`;
  const optionalHeaders = {
    ['DRVR-SESSION']: getAuthenticationSession(getState()),
  };

  return api.put(url, {
    optionalHeaders,
    payload: details,
  }).then(() => {
    dispatch(_vehicleUpdate(details, index));
    return Promise.resolve();
  }, error => Promise.reject(error));
}

function toJson(response) {
  return response.json();
}

const _vehiclesSet = (vehicles, localVehicles) => ({
  type: FLEET_MODEL_VEHICLES_SET,
  vehicles,
  localVehicles,
});

const _vehicleUpdate = (details, index) => ({
  type: FLEET_MODEL_VEHICLE_UPDATE,
  details,
  index,
});

const _vehiclesFilter = (nameFilter) => ({
  type: FLEET_MODEL_VEHICLES_FILTER,
  nameFilter,
});
