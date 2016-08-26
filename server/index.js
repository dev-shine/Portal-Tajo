/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
const ngrok = require('ngrok');

const frontend = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const portal = process.env.DRVR_PROJECT;

const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// Initialize frontend middleware that will serve your JS app
var webpackConfig;

if (isDev) {
  switch (portal) {
    case 'escape':
      webpackConfig = require('../webpack/webpack.dev.escape.babel.js');
      break;
    case 'portal':
      webpackConfig = require('../webpack/webpack.dev.portal.babel.js');
      break;
    case 'ssreports':
      webpackConfig = require('../webpack/webpack.dev.ssreports.babel.js');
      break;
    default:
      webpackConfig = require('../webpack/webpack.dev.escape.babel.js');
      break;
  }
} else {
  webpackConfig = require('../webpack/webpack.prod.babel');
}

app.use(frontend(webpackConfig));

const port = process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err);
  }

  // Connect to ngrok in dev mode
  if (isDev) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }
});
