"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parseConfig = exports.parseConfig = function parseConfig(baseConfig, userConfig) {
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