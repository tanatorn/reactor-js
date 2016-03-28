'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = _bluebird2.default.promisifyAll(_fsExtra2.default);

/**
 * Initializes Reactor
 */
var init = function init(args) {
  if (args.length < 0 || args.length > 1) {
    console.log('You have entered an invalid number of arguments, please try again');
    return;
  }
  var projectName = args[0];

  console.log('Creating ' + projectName + '...');

  var targetDirectory = _path2.default.resolve(process.cwd() + '/' + projectName + '/');
  var templateDirectory = _path2.default.join(__dirname, '../../', 'site-template');

  fs.mkdirAsync(targetDirectory).then(function () {
    return fs.copyAsync(templateDirectory, targetDirectory);
  }).then(function () {
    var message = 'Successfully created ' + projectName + ', to start developing,\n      run \'cd ' + projectName + ' && npm install\'use reactor serve';
    console.log(message);
  }).catch(function (err) {
    if (err.code === 'EEXIST') {
      console.log('The directory you have chosen is not empty, please remove the folder or ' + 'choose another directory');
    }
  });
};

exports.default = init;