'use strict';

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const productionConfig = require('./webpack.production.config');

productionConfig.plugins.push(new BundleAnalyzerPlugin());

module.exports = productionConfig;
