#!/usr/bin/env node

'use strict';

const cypress = require('cypress');
const startDevServer = require('./start-dev-server');
const webpackConfig = require('../webpack/webpack.dev.config');

startDevServer({ webpackConfig }).then((server) => {
  cypress.run().then((results) => {
    if (results.totalFailed > 0) {
      process.exit(1);
    }
    server.close();
  });
});
