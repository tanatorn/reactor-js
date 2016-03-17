'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getPosts = function getPosts(directory) {

  var collection = require.context('posts', true, /.md$/);
  var keys = collection.keys();

  if (directory) {
    keys = keys.filter(function (key) {
      return key.indexOf(directory + '/') !== -1;
    });
  }

  return keys.map(function (key) {
    return collection(key);
  });
};

var Reactor = {
  getPosts: getPosts
};

exports.default = Reactor;