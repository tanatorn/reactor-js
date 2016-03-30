'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackConfig = require('./webpack.config.js');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _helper = require('./helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = _bluebird2.default.promisifyAll(_fsExtra2.default);

var REACTOR_CONFIG = process.cwd() + '/reactor.config.js';

var startServer = function startServer(webpackConfig) {
  var compiler = (0, _webpack2.default)(webpackConfig);
  var server = (0, _express2.default)();

  server.use((0, _webpackDevMiddleware2.default)(compiler, {
    contentBase: webpackConfig.devServer.contentBase,
    publicPath: webpackConfig.devServer.publicPath,
    stats: { colors: true },
    noInfo: true
  }));
  server.use((0, _webpackHotMiddleware2.default)(compiler));

  server.get('*', function (req, res) {
    res.sendFile(_path2.default.join(process.cwd(), 'index.html'));
  });
  server.listen(8080);
};

var serve = function serve() {
  fs.accessAsync(REACTOR_CONFIG, 'fs.R_OK').then(function () {
    var reactorConfig = require(REACTOR_CONFIG);
    if (reactorConfig && reactorConfig.webpack && Object.keys(reactorConfig.webpack).length > 0) {
      var config = (0, _helper.parseConfig)((0, _webpackConfig2.default)(true), reactorConfig, true);
      startServer(config);
    } else {
      startServer((0, _webpackConfig2.default)(true));
    }
  }).catch(function () {
    return startServer((0, _webpackConfig2.default)(true));
  });
};

exports.default = serve;