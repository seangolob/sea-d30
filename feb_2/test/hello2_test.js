'use strict';

var expect = require('chai').expect;
var hello2 = require('../lib/hello2');

describe('hello2', function() {
  it('should greet people', function() {
    expect(hello2.hello()).to.eql('hello world');
  });

  it('should say goodbye', function() {
    expect(hello2.goodbye()).to.eql('goodbye');
  });
});
