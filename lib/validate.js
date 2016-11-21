'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _any = require('./any');

var _numeric = require('./numeric');

var _string = require('./string');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validate = function validate(values, schema) {
  if (!values) throw new Error('values must be supplied');
  var rawSchema = schema instanceof _schema2.default ? schema.get() : schema;
  var allErrors = {};

  for (var key in rawSchema) {
    var rules = rawSchema[key];
    var errors = void 0;

    // Number
    if (rules instanceof _numeric.NumericRule) {
      var numericValidator = new _numeric.NumericValidator(rules);
      errors = numericValidator.check(key, values[key]);

      // String
    } else if (rules instanceof _string.StringRule) {
      var stringValidator = new _string.StringValidator(rules);
      errors = stringValidator.check(key, values[key]);
    }

    if (errors) allErrors[key] = errors;
  }

  return _lodash2.default.get(schema, 'internals.errorHandler') ? schema.internals.errorHandler(allErrors) : allErrors;
};

exports.default = validate;