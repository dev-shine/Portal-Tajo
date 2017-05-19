import moment from 'moment';
import qs from 'query-string';
import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import { requestSamplesLimit } from 'configs';
import { getReportParams } from 'containers/Report/utils/prepareReport';

// import { setLoader } from './loaderActions';
import { createReportFrame, setReportFrameEvents } from './../utils/reportVehicleFrame';
// import { getInstanceExecReportFrameById } from './reducer';

export const EXEC_REPORT_ITEM_NEW_FRAME = 'exReport/newFrame';

export const requestSoloReport = (vehicleId, dateFrom, dateTo) => dispatch =>
  _requestSoloReport(vehicleId, dateFrom, dateTo, dispatch);

// export const setChronicleTimeFrame = (dateFrom, dateTo) => (dispatch, getState) => {
//   // TODO: fix dates comparison (use moments?)
//   //
//   if (getChronicleTimeFrame(getState()).fromDate === dateFrom) {
//     return;
//   }
//   dispatch(_chronicleSetTimeFrame(dateFrom, dateTo));
//   dispatch(_chronicleValidateTimeFrame());
//   dispatch(setChronicleNormalizedT(0));
// };

function _requestSoloReport(vehicleId, dateFrom, dateTo, dispatch) {

  dateFrom = moment().subtract(7, 'days').toDate();
  dateTo = moment().subtract(4, 'days').toDate();

  // setting loading state for local frame
  const theFrame = createReportFrame(dateFrom, dateTo);
  const queryString = _prepareReportsQueryString(dateFrom, dateTo);

  dispatch(_updateVehicleChronicleFrame(vehicleId, theFrame));
  // _fetchSoloHistory(vehicleId, theFrame, dateFrom, dateTo, dispatch);
  // all the reports fetches
  _fetchMilage(vehicleId, theFrame, queryString, dispatch);
  _fetchStats(vehicleId, theFrame, queryString, dispatch);
  _fetchIdiling(vehicleId, theFrame, queryString, dispatch);
  _fetchTemerature(vehicleId, theFrame, queryString, dispatch);
}

function _fetchSoloHistory(vehicleId, theFrame, dateFrom, dateTo, dispatch) {
  let fromString = dateFrom.toISOString();
  fromString = `${fromString.slice(0, -1)}+0000`;
  let toString = dateTo.toISOString();
  toString = `${toString.slice(0, -1)}+0000`;

  const { url, method } = endpoints.getEventsInTimeRange(vehicleId, {
    from: fromString,
    to: toString,
    max: requestSamplesLimit,
    filter: 'PG',
    // tzoffset: new Date().getTimezoneOffset(),
  });
  return api[method](url)
    .then(data => data.json())
    .then((events) => {
      setReportFrameEvents(theFrame, events);
      dispatch(_updateVehicleChronicleFrame(vehicleId, theFrame));
    });
}

function _fetchMilage(vehicleId, theFrame, queryString, dispatch) {
  const url = `${endpoints.getVehicle(vehicleId).url}/${endpoints.mileageReport.url}?${queryString}`;
  api.get(url)
    .then(data => data.json())
    .then(milageData => {
      theFrame.milageDistance = milageData.distance;
      dispatch(_updateVehicleChronicleFrame(vehicleId, theFrame));
    });
}
function _fetchStats(vehicleId, theFrame, queryString, dispatch) {
  const url = `${endpoints.getVehicle(vehicleId).url}/${endpoints.getStats.url}?${queryString}`;
  api.get(url)
    .then(data => data.json())
    .then(statsData => {
      theFrame.distTotal = statsData.dist.total;
      theFrame.distLastTrip = statsData.dist.lastTrip;
      dispatch(_updateVehicleChronicleFrame(vehicleId, theFrame));
    });
}

/// TODO: unify this, used in trports, history, ....
function formatValue(v) {
  if (!v) return '';

  const d = moment.duration(v, 'seconds');
  const s = d.get('seconds');

  const m = d.get('minutes') + ((s > 30) ? 1 : 0);
  const h = d.get('hours');
  // return `${h}h ${m}m ${s}s`;
  return `${h}h ${m}m`;
}
///
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
    .then(idlData => {
      theFrame.idiling.drivingTime = formatValue(idlData.drivingTime);
      theFrame.idiling.ignOffWhileStopped = formatValue(idlData.ignOffWhileStopped);
      theFrame.idiling.ignOn = formatValue(idlData.ignOn);
      theFrame.idiling.ignOnWhileStopped = formatValue(idlData.ignOnWhileStopped);
      theFrame.idiling.stoppedTime = formatValue(idlData.stoppedTime);
      dispatch(_updateVehicleChronicleFrame(vehicleId, theFrame));
    });
}
function _fetchTemerature(vehicleId, theFrame, queryString, dispatch) {
  const tempQuery = `${queryString}&${qs.stringify({ downsampleSec: 30 })}`;
  const url = `${endpoints.getVehicle(vehicleId).url}/${endpoints.temperatureReport.url}?${tempQuery}`;
  api.get(url)
    .then(data => data.json())
    // .then(statsData => {
    //   theFrame.distTotal = statsData.dist.total;
    //   theFrame.distLastTrip = statsData.dist.lastTrip;
    //   dispatch(_updateVehicleChronicleFrame(vehicleId, theFrame));
    // });
}

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

// const _chronicleSetTimeFrame = (dateFrom, dateTo) => ({
//   type: CHRONICLE_SET_TIMEFRAME,
//   dateFrom,
//   dateTo,
// });

// const _chronicleValidateTimeFrame = () => ({
//   type: CHRONICLE_VALIDATE_TIMEFRAME,
// });