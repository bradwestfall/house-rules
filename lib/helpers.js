'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var titleCase = exports.titleCase = function titleCase(camelCase) {
  return camelCase.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase();
  });
};