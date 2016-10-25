import React from 'react';
import pure from 'recompose/pure';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

import styles from './styles.css';

const STYLES = {
  picker: {
    width: 150,
  },
};

class Period extends React.Component {

  onStartDateChange = (event = undefined, value) => {
    this.onChange(this.props.fields.start.name, value);
  }

  onEndDateChange = (event = undefined, value) => {
    this.onChange(this.props.fields.end.name, value);
  }

  onStartTimeChange = (event = undefined, value) => {
    this.onChange(this.props.fields.startTime.name, value);
  }

  onEndTimeChange = (event = undefined, value) => {
    this.onChange(this.props.fields.endTime.name, value);
  }

  onChange = (field, value) => {
    this.props.handlePeriodChange(field, value);
  }

  formatDate = date => moment(date).format(this.props.dateFormat.toUpperCase());

  renderDate = () => (
    <div className={styles['interval-col']}>
      <DatePicker
        textFieldStyle={STYLES.picker}
        className={styles.picker}
        formatDate={this.formatDate}
        autoOk
        hintText="Start date interval"
        defaultDate={this.props.fields.start.default}
        name={this.props.fields.start.name}
        onChange={this.onStartDateChange}
      />
      <DatePicker
        textFieldStyle={STYLES.picker}
        className={styles.picker}
        formatDate={this.formatDate}
        autoOk
        hintText="End date interval"
        defaultDate={this.props.fields.end.default}
        name={this.props.fields.end.name}
        onChange={this.onEndDateChange}
      />
    </div>
  )

  renderTime = () => (
    <div className={styles['interval-col']}>
      <TimePicker
        textFieldStyle={STYLES.picker}
        className={styles.picker}
        autoOk
        defaultTime={this.props.fields.startTime.default}
        format="24hr"
        hintText="Start time interval"
        name={this.props.fields.startTime.name}
        onChange={this.onStartTimeChange}
      />
      <TimePicker
        textFieldStyle={STYLES.picker}
        className={styles.picker}
        autoOk
        defaultTime={this.props.fields.endTime.default}
        format="24hr"
        hintText="End time interval"
        name={this.props.fields.endTime.name}
        onChange={this.onEndTimeChange}
      />
    </div>
  )

  render() {
    return (
      <div className={styles.intervals}>
        { this.renderDate() }
        { this.props.withTime && this.renderTime() }
      </div>
    );
  }
}

Period.propTypes = {
  dateFormat: React.PropTypes.oneOf([
    'yyyy-mm-dd', 'dd-mm-yyyy',
  ]),
  handlePeriodChange: React.PropTypes.func.isRequired,
  fields: React.PropTypes.shape({
    start: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      default: React.PropTypes.any.isRequired,
    }).isRequired,
    end: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      default: React.PropTypes.any.isRequired,
    }).isRequired,
    startTime: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      default: React.PropTypes.any.isRequired,
    }),
    endTime: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      default: React.PropTypes.any.isRequired,
    }),
  }).isRequired,
  withTime: React.PropTypes.bool,
};

export default pure(Period);
