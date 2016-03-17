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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _reactRouter = require('react-router');

var _webpackConfig = require('./webpack.config.js');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const REACTOR_CONFIG = path.join(process.cwd(), 'routes.js')

var render = function render(body) {
  return '<!DOCTYPE html>\n  <html>\n    <head>\n      <title>Reactor</title>\n    </head>\n\n    <body>\n      <div id="react-root">' + body + '</div>\n    </body>\n    <script src="bundle.js"></script>\n  </html>';
};

var startServer = function startServer(routes) {
  var webpackConfig = (0, _webpackConfig2.default)(true);
  var compiler = (0, _webpack2.default)(webpackConfig);
  var app = (0, _express2.default)();
  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    contentBase: webpackConfig.devServer.contentBase,
    publicPath: webpackConfig.devServer.publicPath,
    stats: { colors: true }
  }));
  // noInfo: true,
  app.use((0, _webpackHotMiddleware2.default)(compiler));

  app.get('*', function (req, res) {
    (0, _reactRouter.match)({ routes: routes, location: req.url }, function (error, redirectLocation, props) {
      res.status(200).send(render(_server2.default.renderToString(_react2.default.createElement(_reactRouter.RouterContext, props))));
    });
  });
  app.listen(8080);
  /* const server = new WebpackDevServer(compiler, {
    contentBase: webpackConfig.devServer.contentBase,
    publicPath: webpackConfig.devServer.publicPath,
  })
  server.listen(8080)
  */
};

var serve = function serve(routes) {
  startServer(routes);
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