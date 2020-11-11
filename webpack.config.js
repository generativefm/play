'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    mainFields: ['generativeFmManifest', 'browser', 'module', 'main'],
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
          'style-loader',
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
          path.resolve('./piece-loader.js'),
        ],
        include: path.resolve('./node_modules/@generative-music'),
        type: 'javascript/auto',
      },
      {
        test: /\.png$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.template.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};

module.exports = config;
