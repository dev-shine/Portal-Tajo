import { Map } from 'immutable';
import { isMaritime } from 'configs';
import { getProcessedVehicles } from '../reducer';
import {
  checkLaggedVehicle,
  checkIgnition,
} from './vehicleHelpers';

const _vehUpdater = tickUpdated => vh => {
  vh.set('estimatedTravelKm', tickUpdated.deltaDistKm)
    .set('timeSinceUpdateMin', tickUpdated.deltaTimeMin)
    .set('isDelayedWithIgnitionOff', tickUpdated.isDelayedWithIgnitionOff);
};

function _calcDeltaTimeMin(nowMs, imVehicle) {
  return (nowMs - imVehicle.get('lastUpdateSinceEpoch')) / 1000 / 60;
}

// TODO: needs better name, here we update/reevaluate all the
// delay statuses, etc
// passing nowMs so we dont aquire it for every vehicle (optimisation?)
export function vehicleClientUpdate({
  imVehicle,
  nowMs,
  ignitionOn,
}) {
  const deltaTimeMin = _calcDeltaTimeMin(nowMs, imVehicle);
  const isDelayed = checkLaggedVehicle(deltaTimeMin);

  // TODO -- just a combination of already defined props,
  // used just for displaying other type of warn icon =>
  // move isDelayedWithIgnitionOff definition to GenericListItem
  const isDelayedWithIgnitionOff = ignitionOn !== 1 && isDelayed;

  // what if during initial fleetModel creation
  // latest status timestamp will be old (like many days), no events will ever come
  // from vehicle (something broken) with ws,
  // but it has ignitionOn !== 1 (0 or 2)?
  // const isDelayed = ignitionOn === 1 ? isDelayed : false;

  // estimated travel dist since last update, in meters
  // calculate estimated distance only for maritime
  const deltaDistKm = isMaritime ? imVehicle.get('speed') * (deltaTimeMin / 60) : 0;

  return {
    isDelayedWithIgnitionOff,
    isDelayed,
    deltaTimeMin: Math.round(deltaTimeMin),
    deltaDistKm,
  };
}

// TODO: this needs some optimisation/rethinking - probably
// will be too slow on big fleets
export function localTick(getState) {
  const nowMs = Date.now();
  const imProcessedList = getProcessedVehicles(getState());
  const vehItr = imProcessedList.values();
  let imUpdatedProcessedList = new Map({});
  let currentIt = vehItr.next();

  while (!currentIt.done) {
    const imVehicle = currentIt.value;
    const vehicleId = imVehicle.get('id');
    const ignitionOn = checkIgnition(imVehicle.get('ignitionOn'));
    const tickUpdatedValues = vehicleClientUpdate({
      nowMs,
      imVehicle,
      ignitionOn,
    });
    const imUpdatedVehicle = imVehicle.withMutations(_vehUpdater(tickUpdatedValues));

    imUpdatedProcessedList = imUpdatedProcessedList.mergeIn([vehicleId], imUpdatedVehicle);

    currentIt = vehItr.next();
  }

  return imUpdatedProcessedList;
}

















