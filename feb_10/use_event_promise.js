'use strict';

var promise = require('./event_promise');

promise.readFile('hello.txt');
promise.readFile('does_not_exist.txt');

promise.success(function(data) {
  console.log('data: ' + data);
});

promise.success(function(data) {
  console.log('data2: ' + data);
});

promise.error(function(err) {
  console.log('error: ' + err);
});

console.log('first!');

