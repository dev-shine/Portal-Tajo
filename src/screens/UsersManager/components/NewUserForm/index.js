import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
// import portals from 'configs/portals';
import {
  TextField,
  SelectField,
  MenuItem,
} from 'material-ui';
import { usersActions } from 'services/Users/actions';
import { getIsLoading } from 'services/Users/reducer';
import FormComponents from '../FormComponents';
import { translate } from 'utils/i18n';

import phrases, { phrasesShape } from './PropTypes';

const roles = [
  <MenuItem key={1} value="uber" primaryText="Uber" />,
  <MenuItem key={2} value="admin" primaryText="Administrator" />,
  <MenuItem key={3} value="manager" primaryText="Manager" />,
  <MenuItem key={4} value="installer" primaryText="Installer" />,
];

// const fleets = portals.map(portal => (
//   <MenuItem
//     key={portal.fleet}
//     value={portal.fleet}
//     primaryText={portal.niceName}
//   />
// ));

class NewUserForm extends React.Component {
  constructor(props) {
    super(props);

    this.input = null;

    this.state = {
      email: null,
      password: null,
      // role: 'installer',
      // fleet: null,
    };
  }

  // onFleetChange = (e, key, value) => {
    // this.updateState('fleet', value);
  // }

  onRoleChange = (e, key, value) => {
    // this.updateState('role', value);
  }

  onSubmit = e => {
    e.preventDefault();

    this.props.createUser(this.state)
      .then(() => this.props.closeForm());
  }

  onType = e => {
    const { name, value } = e.target;

    this.updateState(name, value);
  }

  onCancel = () => {
    this.props.closeForm();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpened && nextProps.isOpened) {
      this.input.focus();
    }
  }

  componentDidMount() {
    if (this.props.isOpened) {
      this.input.focus();
    }
  }

  updateState = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  saveInput = ref => {
    if (!ref) return;

    this.input = ref;
  }

  render() {
    const { translations } = this.props;
    const { username, password, role, fleet } = this.state;
    const disabled = !!username && !!password && !!role && !!fleet;
    const submitButtonText = this.props.editMode === 'create' ?
      translations.create : translations.update;

    return (
      <div>
        <FormComponents.Header>
          { translations.add_new_user }
        </FormComponents.Header>
        <form
          name="userEditor"
          onSubmit={this.onSubmit}
        >
          <TextField
            fullWidth
            floatingLabelText={translations.email}
            name="email"
            onChange={this.onType}
            ref={this.saveInput}
          />
          <TextField
            fullWidth
            floatingLabelText={translations.password}
            name="password"
            type="password"
            onChange={this.onType}
          />
          {/*<SelectField
            fullWidth
            floatingLabelFixed
            floatingLabelText="Choose fleet"
            name="fleet"
            value={this.state.fleet}
            onChange={this.onFleetChange}
          >
            {fleets}
          </SelectField>*/}
          <SelectField
            fullWidth
            floatingLabelFixed
            floatingLabelText={translations.choose_role}
            name="role"
            value={this.state.role}
            onChange={this.onRoleChange}
          >
            {roles}
          </SelectField>

          <FormComponents.Buttons
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            disabled={this.props.isLoading || !disabled}
            mainLabel={submitButtonText}
          />

        </form>
      </div>
    );
  }
}

NewUserForm.propTypes = {
  createUser: React.PropTypes.func.isRequired,
  editMode: React.PropTypes.oneOf([
    'create', 'edit',
  ]),
  closeForm: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  isOpened: React.PropTypes.bool.isRequired,
  translations: phrasesShape.isRequired,
};

NewUserForm.defaultProps = {
  editMode: 'create',
};

const mapState = state => ({
  isLoading: getIsLoading(state),
});
const mapDispatch = {
  createUser: usersActions.createUser,
};

const Translated = translate(phrases)(NewUserForm);
const PureNewUserForm = pure(Translated);

export default connect(mapState, mapDispatch)(PureNewUserForm);
