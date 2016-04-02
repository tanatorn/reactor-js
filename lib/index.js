'use strict';

var _getPosts = require('./modules/get-posts');

var _getPosts2 = _interopRequireDefault(_getPosts);

var _createChildRoutes = require('./modules/create-child-routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  getPosts: _getPosts2.default,
  createChildRoutes: _createChildRoutes.createChildRoutes
};