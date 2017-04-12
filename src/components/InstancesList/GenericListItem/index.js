import React from 'react';
import ReactDOM from 'react-dom';
import pure from 'recompose/pure';
import classnames from 'classnames';
import SimpleItem from '../Simple';
import CheckboxItem from '../WithCheckboxes';
import DetailedGFItem from '../WithDetails/gf';
import DetailedVehicleItem from '../WithDetails/vehicle';
import VehicleChronicleItem from '../WithDetails/vehicleChronicle';
import MaritimeItem from '../WithDetails/maritime';
import MWAJobWithDetails from '../WithDetails/MWA';
import StatusIcon from './StatusIcon';
import types from '../types';

import styles from './styles.css';

function _needIndicator(item) {
  const itIsTransport = item.hasOwnProperty('activityStatus');

  if (!itIsTransport) return false;

  return item.activityStatus !== 'ok' || item.isDelayedWithIgnitionOff;
}

function chooseItem(type, {
  onItemClick,
  selectedItems,
  isExpanded,
  translations,
  item,
}) {
  switch (type) {
    case types.withCheckboxes: {
      const isChecked = selectedItems.indexOf(item.id) !== -1;

      return (
        <CheckboxItem
          id={item.id}
          name={item.original.name}
          onClick={onItemClick}
          translations={translations}
          isChecked={isChecked}
        />
      );
    }
    case types.withVehicleDetails: {
      return (
        <DetailedVehicleItem
          onClick={onItemClick}
          isExpanded={isExpanded}
          translations={translations}
          vehicle={item}
        />
      );
    }
    case types.withGFDetails: {
      return (
        <DetailedGFItem
          isExpanded={isExpanded}
          translations={translations}
          gf={item}
        />
      );
    }
    case types.vehicleChronicle: {
      return (
        <VehicleChronicleItem
          id={item.id}
          isExpanded={isExpanded}
          translations={translations}
          name={item.original.name}
        />
      );
    }
    case types.maritime: {
      return (
        <MaritimeItem
          onClick={onItemClick}
          isExpanded={isExpanded}
          translations={translations}
          vehicle={item}
        />
      );
    }
    case types.mwaJob: {
      return (
        <MWAJobWithDetails
          onClick={onItemClick}
          isExpanded={isExpanded}
          translations={translations}
          mwaJobObject={item}
        />
      );
    }
    default:
      return (
        <SimpleItem
          id={item.id}
          name={item.original ? item.original.name : item.name}
          translations={translations}
          onClick={onItemClick}
        />
      );
  }
}

class GenericListItem extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (!this.props.isExpanded && nextProps.isExpanded) {
      this.scrollIntoView();
    }
  }

  scrollIntoView() {
    if (!this.props.scrollIntoView) return;

    const node = ReactDOM.findDOMNode(this);

    if (node.scrollIntoViewIfNeeded) {
      // Works for chrome.
      // true - the element will be aligned so it is centered within
      // the visible area of the scrollable ancestor.
      node.scrollIntoViewIfNeeded(true);
    } else {
      // behaviour works in ff
      node.scrollIntoView({
        behaviour: 'smooth',
      });
    }
  }

  render() {
    const { isExpanded, ...rest } = this.props;
    const className = classnames(styles.list__item, 'listItemDynamic', {
      ['listItemDynamicExpanded']: isExpanded,
      [styles.list__item_expanded]: isExpanded,
    });


    return (
      <li className={className}>

        { _needIndicator(rest.item) && (
          <StatusIcon
            activityStatus={rest.item.activityStatus}
            isDelayedWithIgnitionOff={rest.item.isDelayedWithIgnitionOff}
          />
        )}

        {chooseItem(this.props.type, { ...rest, isExpanded })}
      </li>
    );
  }
}

GenericListItem.propTypes = {
  item: React.PropTypes.object.isRequired,
  isExpanded: React.PropTypes.bool.isRequired,
  onItemClick: React.PropTypes.func,
  dateFormat: React.PropTypes.string.isRequired,
  selectedItems: React.PropTypes.array,
  scrollIntoView: React.PropTypes.bool,
  uncheckOnUnmount: React.PropTypes.bool,

  type: React.PropTypes.oneOf([
    types.withCheckboxes,
    types.withVehicleDetails,
    types.withGFDetails,
    types.vehicleChronicle,
    types.maritime,
    types.simple,
  ]),
};

export default pure(GenericListItem);
