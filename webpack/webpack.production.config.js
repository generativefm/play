'use strict';

const { EnvironmentPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const createWebpackConfig = require('./create-webpack-config');

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
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  })
);

module.exports = config;
