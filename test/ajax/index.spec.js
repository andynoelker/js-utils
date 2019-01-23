'use strict';

var expect = require('chai').expect;
var sinon = require('sinon')
var ajax = require('../../src/ajax');

// set up global objects that ajax function expects
global.fetch = function(url, config) {
  return new Promise(function(resolve, reject){
    resolve();
  });
};

global.Headers = function(config) {};

describe('ajax', () => {
  var fetchFunc;

  beforeEach(() => {
    fetchFunc = sinon.spy(global, 'fetch');
  });

  afterEach(() => {
    global.fetch.restore();
  });

  it ('should call the browser\'s fetch function once', () => {
    expect(fetchFunc.callCount).to.equal(0);
    ajax({url: '/path'});
    expect(fetchFunc.callCount).to.equal(1);
  });

  it ('should use the \'url\' property as the fetch URL', () => {
    ajax({url: '/path'});
    expect(fetchFunc.args[0][0]).to.equal('/path');
  });

  it ('should default to GET if no method is supplied', () => {
    ajax({url: '/path'});
    expect(fetchFunc.args[0][1].method).to.equal('GET');
  });

  it ('should use default fetch parameters', () => {
    ajax({url: '/path'});
    expect(fetchFunc.args[0][1].credentials).to.equal('same-origin');
    expect(fetchFunc.args[0][1].headers).to.deep.equal({});
  });

  it ('should turn passed in data into query parameters', () => {
    ajax({
      url: '/path',
      data: {
        faction: 'jedi',
        name: 'Luke'
      }
    });
    expect(fetchFunc.args[0][0]).to.equal('/path?faction=jedi&name=Luke');
  });

  it ('should turn passed in data into a JSON body for POST requests', () => {
    ajax({
      url: '/path',
      method: 'POST',
      data: {
        faction: 'jedi',
        name: 'Luke'
      }
    });

    const expectedBody = JSON.stringify({
      faction: 'jedi',
      name: 'Luke'
    });

    expect(fetchFunc.args[0][0]).to.equal('/path');
    expect(fetchFunc.args[0][1].method).to.equal('POST');
    expect(fetchFunc.args[0][1].body).to.deep.equal(expectedBody);
  });

  it ('should overwrite default fetch parameters if passed in', () => {
    ajax({
      url: '/path',
      credentials: 'omit'
    });
    expect(fetchFunc.args[0][1].credentials).to.equal('omit');
  });

  it ('should add any extra parameters to the fetch config', () => {
    ajax({
      url: '/path',
      faction: 'jedi'
    });
    expect(fetchFunc.args[0][1].faction).to.equal('jedi');
    expect(fetchFunc.args[0][1].fake).to.equal(undefined);
  });

  it ('should JSON.stringify functions and arrays in a GET request', () => {
    ajax({
      url: '/path',
      data: {
        rank: 'jedi knight',
        planet: {
          name: 'Tatooine',
          star: 'binary'
        }
      }
    });

    expect(fetchFunc.args[0][0]).to.equal('/path?rank=jedi+knight&planet={"name":"Tatooine","star":"binary"}');
  });
});

