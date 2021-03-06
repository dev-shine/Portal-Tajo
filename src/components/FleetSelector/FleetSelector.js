import React from 'react';
import PropTypes from 'prop-types';
// import { List } from 'immutable';
import { css } from 'aphrodite/no-important';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import classes from './classes';

const STYLES = {
  selector: {
    fontSize: 26,
  },
  hide: {
    display: 'none',
  },
};

function renderOptions(fleets) {
  return fleets.map((fleet, i) => (
    <MenuItem
      value={fleet}
      primaryText={fleet.toUpperCase()}
      key={`${fleet}${i}`} // eslint-disable-line react/no-array-index-key
    />
  ));
}

class FleetSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFleet: props.selectedFleet,
    };
  }

  onChange = (e, index, value) => {
    if (value === this.state.selectedFleet) return;

    this.setState({
      selectedFleet: value,
    }, () => {
      this.props.onSelect(value);
    });
  }

  render() {
    if (this.props.fleets === undefined) {
      return false;
    }
    const fleetReadyState = this.props;
    const fleets = this.props.fleets.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    return (
      <div className={css(classes.selector)}>
        <SelectField
          fullWidth
          disabled={fleetReadyState === 'loading'}
          value={this.state.selectedFleet}
          onChange={this.onChange}
          hintText="Select Fleet"
          style={STYLES.selector}
          underlineStyle={STYLES.hide}
          iconStyle={STYLES.hide}
        >
          {renderOptions(fleets)}
        </SelectField>
      </div>
    );
  }
}

FleetSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  // fleets: PropTypes.instanceOf(List).isRequired,
  fleets: PropTypes.arrayOf(PropTypes.string).isRequired,
  fleetReadyState: PropTypes.oneOf(['ready', 'not ready', 'loading', 'error']).isRequired,
  selectedFleet: PropTypes.string,
};

FleetSelector.defaultProps = {
  selectedFleet: null,
};

export default FleetSelector;
