'use strict';

var app = exports = module.exports = {}; // jshint ignore:line

var greeting = 'hello world';

app.hello = function() {
  return greeting;
};

app.goodbye = function() {
  return 'goodbye';
};
