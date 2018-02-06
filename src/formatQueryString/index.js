'use strict';

module.exports = function formatQueryString(url, data) {
  if (data && Object.keys(data).length > 0) {
    let params = Object.keys(data)
                  .map((key) => encodeURIData(data, key))
                  .join('&')
                  .replace(/%20/g, '+');
    return url + '?' + params;
  } else {
   return url;
  }
}

function encodeURIData(data, key) {
  if (Array.isArray(data[key]) && typeof data[key][0] !== 'object') {
    const array = data[key].map(element => {
      return encodeURIComponent(key) + '[]=' + encodeURIComponent(element);
    });
    return array.join('&');
  }

  if (typeof data[key] === 'object' || (Array.isArray(data[key]) && typeof data[key][0] === 'object')) {
    return encodeURIComponent(key) + '=' + JSON.stringify(data[key]);
  }

  return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
}
