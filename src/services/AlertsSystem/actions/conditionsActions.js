  // {
  //   "aboveTemp": -1,
  //   "created": "2017-03-06T18:29:50.950+1100",
  //   "status": "",
  //   "meta": {
  //     "key1": "val1",
  //     "key2": "val2"
  //   },
  //   "kind": "temperature-alert"
  // },
  // {
  //   "gfId": "123456",
  //   "created": "2017-03-06T18:29:50.952+1100",
  //   "status": "",
  //   "meta": {
  //     "key1": "val1",
  //     "key2": "val2"
  //   },
  //   "kind": "geofence-alert"
  // }

import endpoints from 'configs/endpoints';
import { api } from 'utils/api';
import { makeLocalAlertCondition } from '../alertConditionHelper';

export const ALRT_CONDITON_SET = 'alrt/conditionSet';
export const ALRT_VEHICLE_SET = 'alrt/vehAlertConditionsSet';

export const createAlertConditions = (newAlerts) => (dispatch) =>
  _createAlertConditionRequest(newAlerts, dispatch);

export const deleteAlertCondition = alertId => dispatch =>
  _deleteAlertRequest(alertId, dispatch);

export const updateAlertCondition = newAlerts => dispatch =>
  _updateAlertRequest(newAlerts, dispatch);

export const fetchAlertConditions = () => _fetchConditions;

export const fetchVehicleAlertConditions = vehicleId => dispatch =>
  _fetchVehicleAlerConditions(vehicleId, dispatch);

export const postVehicleAlertConditions = (vehicleId, alerts) => dispatch =>
  _postVehicleAlerConditions(vehicleId, alerts, dispatch);

function _fetchConditions(dispatch) {
  const { url, method } = endpoints.getAlertConditions;

  return api[method](url)
    .then(toJson)
    .then(alerts => {
      _setConditions(dispatch, alerts);
    })
    .catch((e) => {
      console.error(e);
    });
}
function _setConditions(dispatch, backEndAlerts) {
  backEndAlerts.forEach((aElement) => {
    dispatch(_conditionSet(makeLocalAlertCondition(aElement)));
  });
}

function _fetchVehicleAlerConditions(vehicleId, dispatch) {
  const { url, method } = endpoints.getVehicleAlertConditions(vehicleId);

  return api[method](url)
    .then(toJson)
    .then((alerts) => {
      _setVehicleAlertConditions(dispatch, vehicleId, alerts);
    })
    .catch((e) => {
      console.error(e);
    });
}
function _setVehicleAlertConditions(dispatch, vehicleId, alertsList) {
  dispatch(_vehicleConditionsSet(vehicleId, alertsList));
}

function _postVehicleAlerConditions(vehicleId, alerts, dispatch) {
  const { url, method } = endpoints.postVehicleAlertConditions(vehicleId);

  return api[method](url, {
    payload: alerts,
  }).then(() => {
    _setVehicleAlertConditions(dispatch, vehicleId, alerts);
 // this.props.fetchVehicleAlertConditions(nextProps.vehicleId)
    return Promise.resolve();
  }, error => Promise.reject(error));
}

function toJson(response) {
  return response.json();
}

/**
 * POST - new Alerts details to the server
 **/
function _createAlertConditionRequest(alertObject, dispatch) {
  const { url, method } = endpoints.createAlertConditions;

  return api[method](url, {
    payload: alertObject,
  }).then(() => {
    _fetchConditions(dispatch);
    return Promise.resolve();
  }, error => Promise.reject(error));
}

/**
 * PUT - update existing Alert
 **/
function _updateAlertRequest(alertObject, dispatch) {
  const { url, method } = endpoints.updateAlertConditions(alertObject.id);

  return api[method](url, {
    payload: alertObject,
  }).then(() => {
    _fetchConditions(dispatch);
    return Promise.resolve();
  }, error => Promise.reject(error));
}

const _conditionSet = condition => ({
  type: ALRT_CONDITON_SET,
  condition,
});

const _vehicleConditionsSet = (vehicleId, conditions) => ({
  type: ALRT_VEHICLE_SET,
  vehicleId,
  conditions,
});