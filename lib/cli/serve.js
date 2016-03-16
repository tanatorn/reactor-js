'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpackConfig = require('./webpack.config.js');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startServer = function startServer() {
  var webpackConfig = (0, _webpackConfig2.default)(true);
  var compiler = (0, _webpack2.default)(webpackConfig);
  var server = new _webpackDevServer2.default(compiler, {
    contentBase: webpackConfig.devServer.contentBase,
    publicPath: webpackConfig.devServer.publicPath
  });
  server.listen(8080);
};

var serve = function serve() {
  startServer();
  // Check if current working directory has an index.js
  // If it does, use it as an entrypoint
  /* fs.accessAsync(REACTOR_CONFIG, 'fs.R_OK')
    // If config file exist
    .then(readReactorConfig)
    .then(startServer)
    .catch(startServer) */
};

exports.default = serve;