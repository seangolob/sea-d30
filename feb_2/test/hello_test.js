'use strict';

var expect = require('chai').expect;
var hello = require('../lib/hello');

describe('hello function', function() {
  it('should return hello world', function() {
    expect(hello()).to.not.eql('goodbye');
    expect(hello()).to.eql('hello world');
  });
});
