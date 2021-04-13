'use strict';

const { EnvironmentPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const createWebpackConfig = require('./create-webpack-config');
const { version } = require('../package.json');

const config = createWebpackConfig({
  styleLoader: MiniCssExtractPlugin.loader,
});

config.mode = 'production';

config.devServer = {
  historyApiFallback: true,
};

config.plugins.push(
  new EnvironmentPlugin({
    SAMPLE_FILE_HOST: 'https://samples.alexbainter.com',
    GFM_STATS_ENDPOINT: 'https://stats.api.generative.fm/v1',
    GFM_USER_ENDPOINT: 'https://user.api.generative.fm/v1',
    APP_VERSION: version,
    IS_NATIVE_APP_HOST: false,
    SENTRY_DSN: null,
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  })
);

if (process.env.SENTRY_AUTH_TOKEN) {
  config.plugins.push(
    new SentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: version,
      org: 'ab-0v',
      project: 'play-web',
      include: ['./src', './dist'],
      deploy: {
        env: 'production',
        name: `${version} automatic deployment`,
        url:
          process.env.GITHUB_RUN_NUMBER &&
          `https://github.com/generative-fm/record/actions/runs/${process.env.GITHUB_RUN_NUMBER}`,
      },
    })
  );
}

module.exports = config;
