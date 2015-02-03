#!/usr/bin/env node
'use strict';

var hello = require('./lib/hello.js');
var hello2 = require('./lib/hello2.js');

var app = function(input) {
  var name = input || process.argv[2] || 'anonymous';
  var result = hello(name);
  console.log(result);
  return result;
};

app();

module.exports = app;
