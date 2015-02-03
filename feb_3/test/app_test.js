'use strict';

var expect = require('chai').expect;
var app = require('../index');

describe('app from index', function() {
  it('should take input and greet input', function() {
    expect(app('world')).to.eql('hello world');
  });

  describe('should process process.argv', function() {
    var arg_cache;

    before(function() {
      arg_cache = process.argv;
      console.dir(arg_cache);
      process.argv = ['node', 'index.js', 'world']; 
      process.argv[2] = 'world';
    });

    after(function() {
      process.argv = arg_cache;
    });

    it('should grab world from process.argv', function() {
      expect(app()).to.eql('hello world');
    });
  });
});
