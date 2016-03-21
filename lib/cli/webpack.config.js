'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getConfig = function getConfig(debug) {

  var config = {
    context: _path2.default.join(process.cwd(), '/'),
    entry: {
      bundle: ['./index.js']
    },
    module: {
      loaders: [{
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }, {
        test: /\.md$/,
        exclude: /(node_modules)/,
        loader: 'markdown-front-matter'
      }, {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        loader: debug ? 'style!css!sass' : _extractTextWebpackPlugin2.default.extract('style', 'css!sass')
      }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.md'],
      modulesDirectories: ['web_modules', 'node_modules', _path2.default.join(__dirname, '../../', 'node_modules')],
      root: _path2.default.resolve(process.cwd())
    },
    devServer: {
      contentBase: _path2.default.resolve(process.cwd()),
      publicPath: 'http://localhost:8080/'
    },
    output: {
      path: _path2.default.join(process.cwd(), 'site'),
      filename: '[name].js',
      libraryTarget: 'umd'
    },
    resolveLoader: {
      root: _path2.default.join(__dirname, '../../', 'node_modules')
    },
    plugins: []
  };

  if (debug) {
    config.devtool = 'cheap-module-source-map';
    config.output.publicPath = 'http://localhost:8080/';
    config.entry.bundle.unshift('webpack-hot-middleware/client?reload=true');
    config.plugins.unshift(new _webpack2.default.optimize.OccurrenceOrderPlugin());
    config.plugins.unshift(new _webpack2.default.HotModuleReplacementPlugin());
    config.plugins.unshift(new _webpack2.default.NoErrorsPlugin());
  } else {
    config.plugins.unshift(new _extractTextWebpackPlugin2.default('[name].css', {
      allChunks: true
    }));
    config.plugins.unshift(new _webpack2.default.optimize.OccurenceOrderPlugin());
    config.plugins.unshift(new _webpack2.default.optimize.DedupePlugin());
    config.plugins.unshift(new _webpack2.default.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false
    }));
  }

  return config;
};

exports.default = getConfig;