#!/usr/bin/env node

'use strict';

const cypress = require('cypress');
const startDevServer = require('./start-dev-server');
const productionConfig = require('../webpack/webpack.production.config');
const developmentConfig = require('../webpack/webpack.dev.config');

const webpackConfig =
  process.argv[2] === '-production' ? productionConfig : developmentConfig;

startDevServer({ webpackConfig }).then(() => {
  cypress.open();
});
