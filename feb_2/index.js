'use strict';

var hello = require('./lib/hello.js');
var hello2 = require('./lib/hello2.js');

process.argv.forEach(function(arg) {
  console.log(arg);
});
