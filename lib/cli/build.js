'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackConfig = require('./webpack.config.js');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _index = require('../plugin/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = _bluebird2.default.promisifyAll(_fsExtra2.default);

var REACTOR_CONFIG = process.cwd() + '/reactor.config.js';

var compile = function compile(config) {
  var compiler = (0, _webpack2.default)(config);
  compiler.run(function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Successfullly generated website!');
  });
};

var build = function build() {
  var config = (0, _webpackConfig2.default)(false);

  fs.accessAsync(REACTOR_CONFIG, 'fs.R_OK').then(function () {
    var _require = require(REACTOR_CONFIG);

    var baseUrl = _require.baseUrl;
    var name = _require.name;

    config.plugins.unshift(new _index2.default.GeneratorPlugin({
      js: 'bundle.js',
      css: 'bundle.css',
      noJS: true,
      baseUrl: baseUrl,
      name: name
    }));
    compile(config);
  }).catch(function () {
    return compile(config);
  });
};

exports.default = build;