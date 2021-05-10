'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const createInjectAssetsPlugin = require('./create-inject-assets-plugin');

const createWebpackConfig = ({ styleLoader, mode }) => ({
  mode,
  devtool: 'eval-cheap-module-source-map',
  entry: {
    main: { import: './src', filename: '[name].[contenthash].js' },
    serviceWorker: { import: './src/service-worker/sw.js', filename: 'sw.js' },
  },
  output: {
    publicPath: '/',
    chunkFilename: '[id].[contenthash].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    mainFields: ['generativeFmManifest', 'browser', 'module', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, '../src'),
          path.join(__dirname, '../node_modules/standardized-audio-context'),
        ],
        use: [
          'thread-loader',
          { loader: 'babel-loader', options: { cacheDirectory: true } },
        ],
      },
      {
        test: /\.(s?css)$/,
        include: path.join(__dirname, '../src'),
        use: [
          styleLoader,
          'thread-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName:
                  mode === 'production'
                    ? '[sha1:hash:hex:4]'
                    : '[path][name][local]',
              },
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
              cacheDirectory: true,
            },
          },
          path.join(__dirname, './piece-loader.js'),
        ],
        include: path.join(__dirname, '../node_modules/@generative-music'),
        type: 'javascript/auto',
      },
      {
        test: /\.png$/,
        include: [
          path.join(__dirname, '../node_modules/@generative-music'),
          path.join(__dirname, '../src'),
        ],
        use:
          mode === 'production'
            ? ['file-loader', 'image-webpack-loader']
            : ['file-loader'],
      },
      {
        test: /\.mp3$/,
        include: path.join(__dirname, '../src'),
        use: 'file-loader',
      },
    ],
  },
  plugins: [
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
