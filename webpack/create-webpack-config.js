'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const createInjectAssetsPlugin = require('./create-inject-assets-plugin');

const createWebpackConfig = ({ styleLoader }) => ({
  devtool: 'source-map',
  entry: {
    main: { import: './src', filename: '[name].[contenthash].js' },
    serviceWorker: { import: './src/service-worker/sw.js', filename: 'sw.js' },
  },
  output: {
    publicPath: '/',
    chunkFilename: '[id].[contenthash].js',
    path: path.join(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    mainFields: ['generativeFmManifest', 'browser', 'module', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '../src'),
        use: ['babel-loader'],
      },
      {
        test: /\.(s?css)$/,
        include: path.join(__dirname, '../src'),
        use: [
          styleLoader,
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
        include: path.join(__dirname, '../node_modules/@generative-music'),
        type: 'javascript/auto',
      },
      {
        test: /\.png$/,
        use: ['file-loader', 'image-webpack-loader'],
      },
      {
        test: /\.mp3$/,
        include: path.join(__dirname, '../src'),
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
    createInjectAssetsPlugin('sw.js'),
    new FaviconsWebpackPlugin({
      logo: './src/logo.png',
      manifest: './src/manifest.json',
      prefix: '',
      favicons: {
        theme_color: '#121212',
        background: '#121212',
      },
    }),
  ],
});

module.exports = createWebpackConfig;
