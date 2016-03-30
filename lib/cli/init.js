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

var _helper = require('./helper');

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = _bluebird2.default.promisifyAll(_fsExtra2.default);

var rl = _bluebird2.default.promisifyAll(_readline2.default.createInterface({
  input: process.stdin,
  output: process.stdout
}));

var question = _bluebird2.default.promisify(function (q, callback) {
  rl.question(q, callback.bind(null, null));
});

/**
 * Initializes Reactor
 */
var init = function init(args) {
  if (args.length < 0 || args.length > 1) {
    console.log('You have entered an invalid number of arguments, please try again');
    return;
  }
  var projectName = args[0];
  var configuration = {};
  console.log('Creating ' + projectName + '...');
  var targetDirectory = _path2.default.resolve(process.cwd() + '/' + projectName + '/');
  var templateDirectory = _path2.default.join(__dirname, '../../', 'site-template');
  question('What is the name of your website? \n').then(function (websiteName) {
    configuration.name = websiteName;
    return question('When the website is generated, would you like to remove the generated' + ' JavaScript bundle? (y/n) ');
  }).then(function (confirmation) {
    configuration.noJS = confirmation.toLowerCase() === 'y' || confirmation.toLowerCase() === 'yes';
    rl.close();
    return fs.mkdirAsync(targetDirectory);
  }).then(function () {
    return fs.copyAsync(templateDirectory, targetDirectory);
  }).then(function () {
    return (0, _helper.createCustomIndex)(configuration);
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