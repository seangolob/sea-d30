'use strict';

var app = exports = module.exports = {};

var greeting = 'hello world';

app.hello = function() {
  return greeting;
};

app.goodbye = function() {
  return 'goodbye';
};
