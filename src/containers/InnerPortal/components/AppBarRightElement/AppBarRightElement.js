import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import FlatButton from 'material-ui/FlatButton';
import { translate } from 'utils/i18n';
import Journal from '../Journal';
import phrases, { phrasesShape } from './PropTypes';
import classes from './classes';

const STYLES = {
  logoutLabel: {
    color: '#fff',
  },
};

const AppBarRightElement = ({
  translations,
  onClick,
}) => {
  return (
    <div className={css(classes.rightElement)}>
      <Journal />
      <FlatButton
        label={translations.logout}
        onClick={onClick}
        hoverColor="transparent"
        labelStyle={STYLES.logoutLabel}
      />
    </div>
  );
};

AppBarRightElement.propTypes = {
  onClick: PropTypes.func.isRequired,
  translations: phrasesShape.isRequired,
};

AppBarRightElement.defaultProps = {
  translations: phrases,
};

export default translate(phrases)(AppBarRightElement);
