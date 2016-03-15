'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getConfig = function getConfig(debug) {

  var config = {
    context: _path2.default.join(process.cwd(), '/'),
    devtool: debug ? 'inline-sourcemap' : null,
    entry: {
      app: ['./index.js']
    },
    module: {
      loaders: [{
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      root: process.cwd()
    },
    devServer: {
      contentBase: _path2.default.resolve(process.cwd()),
      publicPath: 'http://localhost:8080/'
    },
    output: {
      path: _path2.default.join(process.cwd(), 'site'),
      filename: 'bundle.js',
      libraryTarget: 'umd'
    },
    plugins: []
  };

  if (debug) {
    config.devtool = 'eval';
    config.output.publicPath = 'http://localhost:8080/';
    config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080');
    // config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
  } else {
      config.plugins.unshift(new _index2.default({ source: 'bundle.js' }));
      config.plugins.unshift(new _webpack2.default.optimize.DedupePlugin());
      config.plugins.unshift(new _webpack2.default.optimize.OccurenceOrderPlugin());
      config.plugins.unshift(new _webpack2.default.optimize.UglifyJsPlugin({
        mangle: false,
        sourcemap: false
      }));
    }

  return config;
};

exports.default = getConfig;