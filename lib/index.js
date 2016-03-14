'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _eval2 = require('eval');

var _eval3 = _interopRequireDefault(_eval2);

var _helper = require('./helper');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Multiply = function Multiply() {};

Multiply.prototype.apply = function (compiler) {
  compiler.plugin('emit', function (compilation, callback) {
    // TODO: Remove hardcode and actually find the right one by using user configuration
    var src = 'bundle.js';
    var asset = compilation.assets[src];
    var source = (0, _eval3.default)(asset.source(), true);

    // Trying to find the base route
    var routes = void 0;
    if (_react2.default.isValidElement(source.default)) {
      routes = source.default;
    } else if (_react2.default.isValidElement(source.routes)) {
      routes = source.routes;
    } else if (_react2.default.isValidElement(source)) {
      routes = source;
    }

    var directories = (0, _helper.getDirectory)(routes);
    directories.forEach(function (directory) {
      // Match each directory to a route and render out the page
      (0, _reactRouter.match)({ routes: routes, location: directory }, function (error, redirect, renderProps) {
        var file = (0, _helper.render)(_react2.default.createElement(_reactRouter.RouterContext, renderProps));

        // Adding a .html suffix to the directory as well as checking to see if it is an index route
        // If it is an index route, we have to rename the directory from '/.html' to '/index.html'
        var fullPath = directory + '.html';
        if (fullPath.indexOf('/.html') !== -1) {
          fullPath = fullPath.replace('/.html', '/index.html');
        }

        // Wrting file back into the assets
        compilation.assets[fullPath] = { source: function source() {
            return file;
          }, size: function size() {
            return file.length;
          } };
      });
    });

    // Proceed with the with build
    callback();
  });
};

module.exports = Multiply;