import React from 'react';
import pure from 'recompose/pure';
import { rolesEnum } from 'configs/roles';
import MenuItem from './components/ManuItem';
import pageShape from 'containers/InnerPortal/PropTypes';
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, { phrasesShape } from './phrases.lang';

const EMPTY_ARRAY = [];

const MainMenu = ({
  pages,
  closeSidebar,
  role,
  translations,
}) => {
  const menuItems = pages.map(page => {
    const includes = page.includeRoles || EMPTY_ARRAY;
    const excludes = page.excludeRoles || EMPTY_ARRAY;

    if (includes.length && includes.indexOf(role) === -1) return null;
    if (excludes.length && excludes.indexOf(role) !== -1) return null;

    return (
      <MenuItem
        key={page.path}
        page={page}
        niceName={ translations[page.name] }
        closeSidebar={closeSidebar}
      />
    );
  });

  return (
    <ul className={styles.menu}>
      {menuItems}
    </ul>
  );
};

MainMenu.propTypes = {
  closeSidebar: React.PropTypes.func.isRequired,
  pages: React.PropTypes.arrayOf(pageShape).isRequired,
  role: React.PropTypes.oneOf(rolesEnum).isRequired,

  translations: phrasesShape,
};

const Pure = pure(MainMenu);

export default translate(phrases)(Pure);
