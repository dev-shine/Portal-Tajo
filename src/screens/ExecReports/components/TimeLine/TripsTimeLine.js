//
// one vehicle report
//
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import Layout from 'components/Layout';
import StopOver from './StopOver';
import TimeStamp from './TimeStamp';

import { getInstanceExecReportFrameById } from './../../services/reducer';
import { metersToKmString, speedToString, msToTimeIntervalString } from 'utils/convertors';


// const printJSin = require('print.js/dist/print.min.js');
// import classes from './classes';

class TripsTimeLine extends React.Component {


  render() {
    const reportFrame = this.props.getSoloReportById(this.props.vehicleId);
    if (reportFrame === null) {
      return false;
    }
    const tripsList = reportFrame.tripsTimeLine.map((aSegment) => {
      if (aSegment.isAStopOver === true) {
        return <StopOver durationMs={aSegment.durationMs} address={aSegment.address} />;
      }
      else if (aSegment.isATimeStamp === true) {
        return <TimeStamp date={aSegment.date} />;
      }
      else {
        return <div>
          {`Trip ${msToTimeIntervalString(aSegment.durationMs)} ${metersToKmString(aSegment.calculatedDistanceM)} `}
        </div>;
      }
    });
    return (
      <Layout.Content>
        <span> <div /> </span>
        <span> {tripsList} </span>
      </Layout.Content>
    );
  }
}

TripsTimeLine.propTypes = {
  vehicleId: React.PropTypes.string.isRequired,
  getSoloReportById: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  getSoloReportById: getInstanceExecReportFrameById(state),
});

const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(TripsTimeLine));
