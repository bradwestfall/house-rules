'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var errorFormat = {

  combine: function combine(errors) {
    var newErrors = {};
    for (var key in errors) {
      newErrors[key] = errors[key].errors.join(', ');
    }
    return newErrors;
  },

  combineWithLabels: function combineWithLabels(errors) {
    var newErrors = {};
    for (var key in errors) {
      newErrors[key] = errors[key].label + ': ' + errors[key].errors.join(', ');
    }
    return newErrors;
  }

};

exports.default = errorFormat;