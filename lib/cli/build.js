'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackConfig = require('./webpack.config.js');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var build = function build() {
  var config = (0, _webpackConfig2.default)(false);
  var compiler = (0, _webpack2.default)(config);
  compiler.run(function (err) {
    if (err) {
      console.error(err);
    }
  });
};

exports.default = build;