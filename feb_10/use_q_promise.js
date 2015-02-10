'use strict';

var readFile= require('./q_promise');

var file1 = readFile('hello.txt');
file1.then(function(data) {
  console.log('data: ' + data.toString());
}, function(error) {
  console.log('error: '+ error);
})
file1.then(function() {
  console.log('this should call after');
})

var file2 = readFile('does_not_exist.txt')
file2.then(function(data) {
  console.log('will not be called');
}, function(err) {
  console.log('error: ' + err);
});
