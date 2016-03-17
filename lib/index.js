'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var getPosts = function getPosts(directory) {
  if (typeof document !== 'undefined') {
    var _ret = function () {
      var collection = require.context('posts', true, /.md$/);
      var keys = collection.keys();

      if (directory) {
        keys = keys.filter(function (key) {
          return key.indexOf(directory + '/') !== -1;
        });
      }

      return {
        v: keys.map(function (key) {
          return collection(key);
        })
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
  return [];
};

var Reactor = {
  getPosts: getPosts
};

exports.default = Reactor;