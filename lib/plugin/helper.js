'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRoute = exports.getDirectory = exports.render = undefined;

var _reactRouter = require('react-router');

var _server = require('react-dom/server');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var render = exports.render = function render(route, options, assets) {

  var style = '<link rel="stylesheet" type="text/css" href="/' + assets.css + '">';

  var body = !options.noJS ? '<div id="react-root">' + (0, _server.renderToString)(route) + '</div>' : (0, _server.renderToStaticMarkup)(route);

  var script = !options.noJS ? '<script src="' + assets.js + '"></script>' : '';

  var markup = '\n  <!doctype html>\n  <html>\n    <head>\n      <meta charset="utf-8">\n      <title>' + options.name + '</title>\n      <meta name="viewport" content="width=device-width, initial-scale=1">\n      ' + style + '\n    </head>\n    <body>\n      ' + body + '\n      ' + script + '\n    </body>\n  </html>\n  ';
  return markup;
};

var getDeepDirectory = function getDeepDirectory(route, directories, currentPosition) {
  if (!route) {
    return;
  }

  if (route.path) {
    directories.push(currentPosition.join('/') + '/' + route.path);
  }

  if (route.childRoutes) {
    route.childRoutes.forEach(function (childRoute) {
      getDeepDirectory(childRoute, directories, [].concat(_toConsumableArray(currentPosition), [route.path]));
    });
  }
};

var getDirectory = exports.getDirectory = function getDirectory(routes) {
  var primaryRoute = (0, _reactRouter.createRoutes)(routes)[0];
  var directories = [];
  getDeepDirectory(primaryRoute, directories, []);
  return directories.map(function (directory) {
    return directory.replace('//', '/');
  });
};

var isRoute = exports.isRoute = function isRoute(element) {
  return element.type && element.type.displayName === 'Route';
};