import React from 'react';
import pure from 'recompose/pure';
// import ListItem from './../ListItem';
import ListItemVehicle from './../ListItemVehicle';
import PowerFilter from './../PowerFilter';
import styles from './styles.css';
import * as ListEvents from 'components/PowerListContainer/events';
//        <PowerFilter />


class ListBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemId: undefined,
    };
    this.onSelectCallback = this.onSelect.bind(this);
  }

  onSelect(id) {
    if(this.state.selectedItemId === id) {
      return;
    }
    this.props.hooks(ListEvents.LIST_ITEM_SELECTED, id);
    this.setState({ selectedItemId: id });
  }

  render() {
    if (this.props.items.size === 0) {
      return null;
    }

    const items = this.props.items.map((v) => (
      <li key={v.id}>
        <ListItemVehicle
          vehicleObj={v}
          onClick={this.onSelectCallback}
          isSelected={this.state.selectedItemId === v.id}
        />
      </li>
    ));
    return (
      <div className={styles.listBoxTopContainer}>
        <PowerFilter />
        <ul className={styles.listBoxList}>
          {items}
        </ul>
      </div>
    );
  }
}

ListBox.propTypes = {
  items: React.PropTypes.array.isRequired,
  hooks: React.PropTypes.func.isRequired,
};

const PureListBox = pure(ListBox);

export default PureListBox;
