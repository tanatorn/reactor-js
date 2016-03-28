'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateMarkup = function generateMarkup(content) {
  return { __html: content };
};

var getPosts = function getPosts(directory, mappingCallback) {

  var collection = require.context('posts', true, /.md$/);
  var keys = collection.keys();

  if (directory) {
    keys = keys.filter(function (key) {
      return key.indexOf(directory + '/') !== -1;
    });
  }

  var collections = keys.map(function (key) {
    return collection(key);
  });

  if (!mappingCallback) {
    return collections.map(function (post, index) {
      return _react2.default.createElement(
        'div',
        { key: index },
        _react2.default.createElement(
          'h3',
          { className: 'post-title' },
          post.attributes.title
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'h4',
          { className: 'post-description' },
          post.attributes.description
        ),
        _react2.default.createElement('div', { className: 'post-body', dangerouslySetInnerHTML: generateMarkup(post.body) })
      );
    });
  }

  return collections.map(mappingCallback);
};

exports.default = getPosts;