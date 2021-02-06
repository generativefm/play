'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const createInjectAssetsPlugin = require('./create-inject-assets-plugin');

const config = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: { import: './src', filename: '[name].[contenthash].js' },
    serviceWorker: { import: './src/service-worker/sw.js', filename: 'sw.js' },
  },
  output: {
    publicPath: '/',
    chunkFilename: '[id].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    mainFields: ['generativeFmManifest', 'browser', 'module', 'main'],
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve('./src'),
        use: ['babel-loader'],
      },
      {
        test: /\.(s?css)$/,
        include: path.resolve('./src'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.gfm.manifest.json$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-syntax-dynamic-import'],
            },
          },
          path.join(__dirname, './piece-loader.js'),
        ],
        include: path.resolve('./node_modules/@generative-music'),
        type: 'javascript/auto',
      },
      {
        test: /\.png$/,
        use: ['file-loader', 'image-webpack-loader'],
      },
      {
        test: /\.mp3$/,
        include: path.resolve('./src'),
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.template.html',
      excludeChunks: ['serviceWorker'],
    }),
    new EnvironmentPlugin({
      SAMPLE_FILE_HOST: 'https://samples.alexbainter.com',
      GFM_STATS_ENDPOINT: 'https://stats.api.generative.fm/v1',
      GFM_USER_ENDPOINT: 'https://user.api.generative.fm/v1',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    createInjectAssetsPlugin('sw.js'),
  ],
};

module.exports = config;
