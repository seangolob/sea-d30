'use strict';

require('../simple_http_server');
var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

var expect = chai.expect;

describe('our http server', function() {
  var server = 'localhost:3000';
  it('should respond to a first request', function(done) {
    chai.request(server)
      .get('/first_route')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('wow, first route\nsuch http\n');
        done();
      });
  });

  it('should respond to a second request', function(done) {
    chai.request(server)
      .get('/second_route')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('wow, second route\nsuch http\n'); 
        done();
      });
  });

  it('should have a default route', function(done) {
    chai.request(server)
      .get('/some_other_route')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('did not hit a route\nsuch http\n');
        done();
      });
  });
});
