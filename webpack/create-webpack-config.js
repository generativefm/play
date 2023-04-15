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
    alias: {
      react: path.join(__dirname, '../node_modules/react'),
      'react-router-dom': path.join(
        __dirname,
        '../node_modules/react-router-dom'
      ),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, '../src'),
          path.join(__dirname, '../node_modules/standardized-audio-context'),
        ],
        use: ['babel-loader'],
      },
      {
        test: /\.(s?css)$/,
        use: [
          styleLoader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
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
  performance: {
    hints: false,
  },
});

module.exports = createWebpackConfig;
