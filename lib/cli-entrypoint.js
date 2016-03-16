#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _init = require('./cli/init');

var _init2 = _interopRequireDefault(_init);

var _serve = require('./cli/serve');

var _serve2 = _interopRequireDefault(_serve);

var _build = require('./cli/build');

var _build2 = _interopRequireDefault(_build);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('0.0.1').usage('<command>').option('init', 'Create a new Reactor project').option('serve', 'Run a Reactor server instance').option('build', 'Build the static website').parse(process.argv);

if (_commander2.default.init) {
  (0, _init2.default)(_commander2.default.args);
}

if (_commander2.default.serve) {
  (0, _serve2.default)();
}

if (_commander2.default.build) {
  (0, _build2.default)();
}