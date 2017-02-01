/**
 * escape.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'babel-polyfill';

// Load the favicon, the manifest.json file and the .htaccess file
import 'file?name=[name].[ext]!../favicon.ico';
import 'file?name=[name].[ext]!../manifest.json'; // manifest for mobile devices
import 'file?name=[name].[ext]!../.htaccess';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

require('sanitize.css/sanitize.css');

export const renderProject = ({
  anchor,
  createRoutes,
  configureStore,
  createReducer,
}) => {
  // Create redux store with history
  // this uses the singleton
  const initialState = {};
  const store = configureStore(initialState, browserHistory, createReducer);

  ReactDOM.render(
    <Provider store={store}>
      {createRoutes(store)}
    </Provider>, anchor
  );
};

export const renderProjectWithoutRoutes = ({
  anchor,
  rootNode,
  configureStore,
  createReducer,
}) => {
  // Create redux store with history
  // this uses the singleton
  const initialState = {};
  const store = configureStore(initialState, browserHistory, createReducer);

  ReactDOM.render(
    <Provider store={store}>
      {rootNode}
    </Provider>, anchor
  );
};
