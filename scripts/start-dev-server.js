'use strict';

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const startDevServer = ({ port = 8080, webpackConfig } = {}) =>
  new Promise((resolve) => {
    const compiler = Webpack(webpackConfig);
    const { devServer } = webpackConfig;
    const server = new WebpackDevServer(compiler, devServer);
    server.listen(port, '127.0.0.1', () => {
      compiler.hooks.done.tap('DevServerPlugin', () => {
        resolve(server);
      });
    });
  });

module.exports = startDevServer;
