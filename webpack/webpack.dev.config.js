'use strict';

const fetch = require('node-fetch');
const { EnvironmentPlugin } = require('webpack');
const createWebpackConfig = require('./create-webpack-config');

const config = createWebpackConfig({
  styleLoader: 'style-loader',
});

config.mode = 'development';

config.plugins.push(
  new EnvironmentPlugin({
    SAMPLE_FILE_HOST: '//localhost:6969',
    GFM_STATS_ENDPOINT: '/api',
    GFM_USER_ENDPOINT: 'https://user.api.generative.fm/v1',
  })
);

config.devServer = {
  historyApiFallback: true,
  before: (app) => {
    app.get('/api/global/playtime', (req, res) =>
      fetch('http://stats.api.generative.fm/v1/global/playtime').then(
        (response) => {
          response.body.pipe(res);
        }
      )
    );
    app.post('/api/emissions', (req, res) => {
      res.sendStatus(200);
    });
  },
};

module.exports = config;
