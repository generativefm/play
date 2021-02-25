#!/usr/bin/env node

'use strict';

const cypress = require('cypress');
const startDevServer = require('./start-dev-server');
const webpackConfig = require('../webpack/webpack.dev.config');

startDevServer({ webpackConfig }).then(() => {
  cypress.open();
});
