'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReactorConfig = exports.createCustomIndex = exports.parseConfig = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = _bluebird2.default.promisifyAll(_fsExtra2.default);

var parseConfig = exports.parseConfig = function parseConfig(baseConfig, userConfig, debug) {
  var config = baseConfig;

  var _userConfig$webpack = userConfig.webpack;
  var entry = _userConfig$webpack.entry;
  var module = _userConfig$webpack.module;
  var resolve = _userConfig$webpack.resolve;

  if (module) {
    var loaders = module.loaders;
    // Add all the custom loaders

    if (Array.isArray(loaders)) {
      loaders.forEach(function (loader) {
        return config.module.loaders.push(loader);
      });
    }
  }

  if (entry) {
    config.entry = entry;

    // Main module is currently the first one
    var mainBundle = Object.keys(entry)[0];
    if (debug) {
      config.entry[mainBundle].push('webpack-hot-middleware/client?reload=true');
    }
  }

  if (resolve) {
    if (Array.isArray(resolve.extensions)) {
      resolve.extensions.forEach(function (extension) {
        return config.resolve.extensions.push(extension);
      });
    }
  }

  return config;
};

// Generate custom index file with the site name as the title
var createCustomIndex = exports.createCustomIndex = function createCustomIndex(_ref, directory) {
  var name = _ref.name;

  var content = '\n  <!doctype html>\n  <html>\n    <head>\n      <title>' + name + '</title>\n      <base href="/" />\n    </head>\n    <body>\n      <div id="react-root"></div>\n      <script src="bundle.js"></script>\n    </body>\n  </html>';
  return fs.writeFileAsync(_path2.default.resolve(directory + '/index.html'), content);
};

var createReactorConfig = exports.createReactorConfig = function createReactorConfig(_ref2, directory) {
  var name = _ref2.name;
  var baseUrl = _ref2.baseUrl;

  var configTemplate = '\n  module.exports = {\n    name: \'' + name + '\'\n  }';
  return fs.writeFileAsync(directory + '/reactor.config.js', configTemplate);
};