'use strict';

var formatQueryString = require('../formatQueryString');
var addObjectValues = require('../addObjectValues');

module.exports = function ajax(config) {
  // check if config is object - use my isObject util
  var method = config.method ? config.method.toUpperCase() : 'GET';
  var url, customConfig = {};

  if (method === 'GET') {
    url = formatQueryString(config.url, config.data);
  } else {
    url = config.url;
    customConfig.body = JSON.stringify(config.data);
  }

  // Remove config properties that are formatted by this function
  delete config.url;
  delete config.data;
  delete config.method;

  var args = {
    method: method,
    credentials: 'same-origin',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    })
  };

  args = addObjectValues(customConfig, args);
  args = addObjectValues(config, args);

  return fetch(url, args);
};
