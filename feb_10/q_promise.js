'use strict';

var Q = require('q');
var fs = require('fs');


module.exports = function(filename) {
  var deferred = Q.defer();

  fs.readFile(filename, function(err, data) {
    if (err) 
      deferred.reject(err);
    else
      deferred.resolve(data);
  });

  return deferred.promise; 
};
