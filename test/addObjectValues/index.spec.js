'use strict';

var expect = require('chai').expect;
var addObjectValues = require('../../src').addObjectValues;

describe('addObjectValues', function() {
  it ('should return an object with all values added from another object', function() {
    var data = {
      jedi: 'luke',
      sith: 'vader'
    };

    var target = {
      smugglers: 'han'
    };

    var expected = {
      smugglers: 'han',
      jedi: 'luke',
      sith: 'vader'
    };

    expect(addObjectValues(data, target)).to.deep.equal(expected);
  });
});
