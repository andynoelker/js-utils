'use strict';

var expect = require('chai').expect;
var formatQueryString = require('../../src').formatQueryString;

describe('formatQueryString', function() {
  it('should format all properties of a data object as a query parameter string', function() {
    var url = '/path';
    var data = {
      jedi: 'luke',
      sith: 'vader'
    };
    var expected = '/path?jedi=luke&sith=vader';

    expect(formatQueryString(url, data)).to.equal(expected);
  });

  it('should return the passed URL if no data object is provided', function() {
    var url = '/path';

    expect(formatQueryString(url)).to.equal(url);
    expect(formatQueryString(url, {})).to.equal(url);
  });

  it('should format array elements', function() {
    var url = '/path';
    var data = {
      foo: [ 'han', 'leia' ]
    };
    var expected = '/path?foo[]=han&foo[]=leia';

    expect(formatQueryString(url, data)).to.equal(expected);
  });

  it('should JSON stringify objects as a parameter', function() {
    var url = '/path';
    var data = {
      foo: { 'han': 'leia' }
    };
    var expected = '/path?foo={"han":"leia"}';

    expect(formatQueryString(url, data)).to.equal(expected);
  });
});
