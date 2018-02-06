'use strict';

module.exports = function addObjectValues(values, target) {
  for (var key in values) {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
      target[key] = values[key];
    }
  }

  return target;
}

