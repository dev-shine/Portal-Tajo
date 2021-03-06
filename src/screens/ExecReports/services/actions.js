// import moment from 'moment';
import qs from 'query-string';
import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import { queueReverseGeocodeClear } from 'utils/mapServices/google/geocode';

// import { setLoader } from './loaderActions';
import { createReportFrame, setReportFrameEvents } from './../utils/reportVehicleFrame';
import { getExecTimeFrame, getInstanceExecReportFrameById } from './reducer';

export const EXEC_SET_TIMEFRAME = 'exReport/setTime';
export const EXEC_CLEAR_LOCAL = 'exReport/clear';

export const EXEC_REPORT_ITEM_NEW_FRAME = 'exReport/newFrame';

export const setExecTimeFrame = (dateFrom, dateTo) => (dispatch, getState) => {
  // TODO: fix dates comparison (use moments?)
  //
  if (getExecTimeFrame(getState()).fromDate === dateFrom) {
    return;
  }
  dispatch(_execSetTimeFrame(dateFrom, dateTo));
  dispatch(_execClearLocalFrames());
  queueReverseGeocodeClear();
};

export const requestSoloReport = (vehicleId, dateFrom, dateTo) => (dispatch, store) =>
// export const requestTripsReport = (vehicleId, dateFrom, dateTo) => dispatch =>
  _requestTripsReport(vehicleId, dateFrom, dateTo, dispatch, store);


function _requestTripsReport(vehicleId, dateFrom, dateTo, dispatch, store) {
  // dateTo = moment(dateFrom).toDate();
  // dateFrom = moment(dateFrom).subtract(3, 'days').toDate();

  // setting loading state for local frame
  const theFrame = createReportFrame(dateFrom, dateTo);
  dispatch(_updateVehicleChronicleFrame(vehicleId, theFrame));

  const queryString = _prepareReportsQueryString(dateFrom, dateTo);

  _fetchSoloHistory(vehicleId, theFrame, dateFrom, dateTo, dispatch, store);
  // all the reports fetches
  _fetchMilage(vehicleId, theFrame, queryString, dispatch);
  _fetchStats(vehicleId, theFrame, queryString, dispatch);
  _fetchIdiling(vehicleId, theFrame, queryString, dispatch);
  _fetchTemerature(vehicleId, theFrame, queryString, dispatch);
}

function _fetchSoloHistory(vehicleId, theFrame, dateFrom, dateTo, dispatch, store) {
  let fromString = dateFrom.toISOString();
  fromString = `${fromString.slice(0, -1)}+0000`;
  let toString = dateTo.toISOString();
  toString = `${toString.slice(0, -1)}+0000`;

  const { url, method } = endpoints.getEventsInTimeRange(vehicleId, {
    from: fromString,
    to: toString,
    max: 100000, //  requestSamplesLimit,
    filter: 'PG',
    // tzoffset: new Date().getTimezoneOffset(),
  });
  return api[method](url)
    .then(data => data.json())
    .then((events) => {
      setReportFrameEvents(theFrame, events, () => {
        const frame = getInstanceExecReportFrameById(store())(vehicleId);
        // checking if the frame still exists in the store
        // (not invalidated with date change)
        if (!frame.isDummy()) {
          dispatch(_updateVehicleChronicleFrame(vehicleId, theFrame));
        }
      });

      dispatch(_updateVehicleChronicleFrame(vehicleId, theFrame));
    });
}

function _fetchMilage(vehicleId, theFrame, queryString, dispatch) {
  const url = `${endpoints.getVehicle(vehicleId).url}/${endpoints.mileageReport.url}?${queryString}`;
  api.get(url)
    .then(data => data.json())
    .then((milageData) => {
      theFrame.milageDistance = milageData.distance;
      dispatch(_updateVehicleChronicleFrame(vehicleId, theFrame));
    });
}
function _fetchStats(vehicleId, theFrame, queryString, dispatch) {
  const url = `${endpoints.getVehicle(vehicleId).url}/${endpoints.getStats.url}?${queryString}`;
  api.get(url)
    .then(data => data.json())
    .then((statsData) => {
      theFrame.distTotal = statsData.dist.total;
      theFrame.distLastTrip = statsData.dist.lastTrip;
      dispatch(_updateVehicleChronicleFrame(vehicleId, theFrame));
    });
}

// /
// drivingTime
// from
// ignOffWhileStopped
// ignOn
// ignOnWhileStopped
// stoppedTime
// to
function _fetchIdiling(vehicleId, theFrame, queryString, dispatch) {
  const url = `${endpoints.getVehicle(vehicleId).url}/${endpoints.idlingReport.url}?${queryString}`;
  api.get(url)
    .then(data => data.json())
    .then((idlData) => {
      theFrame.idiling.drivingTime = (idlData.drivingTime);
      theFrame.idiling.ignOffWhileStopped = (idlData.ignOffWhileStopped);
      theFrame.idiling.ignOn = (idlData.ignOn);
      theFrame.idiling.ignOnWhileStopped = (idlData.ignOnWhileStopped);
      theFrame.idiling.stoppedTime = (idlData.stoppedTime);
      dispatch(_updateVehicleChronicleFrame(vehicleId, theFrame));
    });
}
function _fetchTemerature(vehicleId, theFrame, queryString/* , dispatch*/) {
  const tempQuery = `${queryString}&${qs.stringify({ downsampleSec: 30 })}`;
  const url = `${endpoints.getVehicle(vehicleId).url}/${endpoints.temperatureReport.url}?${tempQuery}`;
  api.get(url)
    .then(data => data.json());
    // .then(statsData => {
    //   theFrame.distTotal = statsData.dist.total;
    //   theFrame.distLastTrip = statsData.dist.lastTrip;
    //   dispatch(_updateVehicleChronicleFrame(vehicleId, theFrame));
    // });
}
// TODO: needs to be fixed - timezone counted in a wrong way
function _prepareReportsQueryString(dateFrom, dateTo) {
  let fromString = dateFrom.toISOString();
  fromString = `${fromString.slice(0, -1)}+0000`;
  let toString = dateTo.toISOString();
  toString = `${toString.slice(0, -1)}+0000`;

  return qs.stringify({
    from: fromString,
    to: toString,
    tzoffset: 0,
  });
}
// from=2017-05-13T22%3A00%3A00.000%2B0000&to=2017-05-14T22%3A00%3A00.000%2B0000&
// from=2017-05-09T22%3A00%3A00.000%2B0000&to=2017-05-10T22%3A00%3A00.000%2B0000&tzoffset=0
const _updateVehicleChronicleFrame = (vehicleId, reportFrame) => ({
  type: EXEC_REPORT_ITEM_NEW_FRAME,
  vehicleId,
  reportFrame,
});

const _execSetTimeFrame = (dateFrom, dateTo) => ({
  type: EXEC_SET_TIMEFRAME,
  dateFrom,
  dateTo,
});

const _execClearLocalFrames = () => ({
  type: EXEC_CLEAR_LOCAL,
});
