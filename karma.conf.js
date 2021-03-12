'use strict';

// Karma configuration
// Generated on Tue Feb 23 2021 13:41:43 GMT-0600 (Central Standard Time)

const { EnvironmentPlugin } = require('webpack');
const createWebpackConfig = require('./webpack/create-webpack-config');

const webpackConfig = createWebpackConfig({ styleLoader: null });

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'webpack'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/sinon/pkg/sinon.js',
      { pattern: 'src/**/*.spec.js', watched: false },
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
    },

    webpack: {
      resolve: webpackConfig.resolve,
      module: {
        rules: [
          webpackConfig.module.rules[0], // js(x)
          webpackConfig.module.rules[2], //.gfm.manifest.json
          {
            test: /^[^.]+$|\.(?!(jsx?)$)([^.]+$)/, //anything else
            use: 'null-loader',
          },
        ],
      },
      plugins: [
        new EnvironmentPlugin({
          GFM_USER_ENDPOINT: '',
        }),
      ],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
