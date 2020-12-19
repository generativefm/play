'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fetch = require('node-fetch');

const config = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    publicPath: '/',
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    mainFields: ['generativeFmManifest', 'browser', 'module', 'main'],
  },
  devServer: {
    historyApiFallback: true,
    before: (app, server, compiler) => {
      app.get('/api/playtime', (req, res) =>
        fetch('http://api.generative.fm/v1/playtime').then((response) => {
          response.body.pipe(res);
        })
      );
    },
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
};

module.exports = config;
