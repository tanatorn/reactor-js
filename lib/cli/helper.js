'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// import Promise from 'bluebird'
// import fse from 'fs-extra'

// const fs = Promise.promisifyAll(fse)

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

var createCustomIndex = exports.createCustomIndex = function createCustomIndex(_ref) {
  var name = _ref.name;
  return '\n  <!doctype html>\n  <html>\n    <head>\n      <title>' + name + '</title>\n    </head>\n    <body style="margin: 0;">\n      <div id="react-root"></div>\n      <script src="bundle.js"></script>\n    </body>\n  </html>';
};