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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serve = function serve() {
  var webpackConfig = (0, _webpackConfig2.default)(true);
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

  /* fs.accessAsync(REACTOR_CONFIG, 'fs.R_OK')
    .then(() => fs.readFileAsync(REACTOR_CONFIG, 'utf8'))
    .then((data) => {
      const transpiledData = babel.transform(data, { presets: ['es2015', 'stage-0', 'react'] }).code
      const routes = _eval(transpiledData, true)
      startServer(routes)
    })*/

  // Check if current working directory has an index.js
  // If it does, use it as an entrypoint
  /* fs.accessAsync(REACTOR_CONFIG, 'fs.R_OK')
    // If config file exist
    .then(readReactorConfig)
    .then(startServer)
    .catch(startServer) */
};

exports.default = serve;