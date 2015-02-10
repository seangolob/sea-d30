'use strict';

var net = require('net');

var client = net.connect({port: 3000}, function() {
  client.write('GET / HTTP/1.1\n' + 
               'User-Agent: curl/7.40.0\n' +
               'Host: localhost:3000\n' + 
               'Accept: */*\n', function(data) {
      console.log(data.toString('utf-8'));
  });

  client.on('data', function(data) {
    console.log(data.toString('utf-8'));
  });
});
