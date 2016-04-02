'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createChildRoutes = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createChildRoutes = exports.createChildRoutes = function createChildRoutes(posts) {
  return posts.map(function (post, index) {
    var RouteComponentWrapper = function RouteComponentWrapper() {
      return post;
    };
    return _react2.default.createElement(_reactRouter.Route, { component: RouteComponentWrapper, path: index.toString(), key: index });
  });
};