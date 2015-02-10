'use strict';

var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var fs = require('fs');

var Promise = function() {

};

inherits(Promise, EventEmitter);

Promise.prototype.success = function(callback) {
  this.on('done', callback);
};

Promise.prototype.error = function(callback) {
  this.on('foobarred', callback);
};

Promise.prototype.resolve = function(data) {
  this.emit('done', data);
};

Promise.prototype.reject = function(data) {
  this.emit('foobarred', data);
};

Promise.prototype.readFile = function(filename) {
  fs.readFile(filename, function(err, data) {
    if (err) 
      this.reject(err);
    else
      this.resolve(data);
  }.bind(this));
};

var promise = new Promise();
module.exports = promise
