'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnyValidator = exports.AnyRule = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/****************************************
  Rule Builder
*****************************************/

var AnyRule = function () {

  /**
   * Utilities
   */

  function AnyRule(rules) {
    _classCallCheck(this, AnyRule);

    this.rules = rules || {};
  }

  _createClass(AnyRule, [{
    key: 'hasRule',
    value: function hasRule(ruleName) {
      if (typeof ruleName !== 'string') throw new Error('"ruleName" should be a string');
      return this.rules[ruleName];
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this.rules;
    }

    /**
     * Rules
     */

  }, {
    key: 'required',
    value: function required(message) {
      return this.setRule('required', true, message);
    }
  }, {
    key: 'optional',
    value: function optional() {
      return this.setRule('required', false);
    }
  }, {
    key: 'in',
    value: function _in(possible, message) {
      if (!Array.isArray(possible)) throw new Error('"possible" should be an array');
      return this.setRule('in', possible, message);
    }
  }, {
    key: 'message',
    value: function message(_message) {
      if (typeof _message !== 'string') throw new Error('"message" should be a string');
      return this.setRule('message', _message);
    }
  }, {
    key: 'label',
    value: function label(_label) {
      if (typeof _label !== 'string') throw new Error('"label" should be a string');
      return this.setRule('label', _label);
    }
  }]);

  return AnyRule;
}();

/****************************************
  Validator
*****************************************/

var AnyValidator = function () {

  /**
   * Utilities
   */

  function AnyValidator(rules) {
    _classCallCheck(this, AnyValidator);

    this.rules = rules.toJSON() || {};
  }

  _createClass(AnyValidator, [{
    key: 'check',
    value: function check(key, value) {

      // Collect errors
      var errors = [];

      // Check Value ( as string )
      var checkValue = value === null || value === undefined || value.trim() === '' ? '' : '' + value;

      // Check requiredness before all other rules
      var requiredErrorMessage = this.checkRule(checkValue, 'required');
      if (requiredErrorMessage) return this.formatErrorMessage(key, value, [requiredErrorMessage]);

      // Check everything else
      for (var ruleName in this.rules) {
        if (typeof this[ruleName] === 'function' && ruleName !== 'required') {
          errors.push(this.checkRule(checkValue, ruleName));
        }
      }

      // Normalize Errors
      errors = _lodash2.default.without(errors, null, undefined, '');

      // Only return errors if some were found
      if (errors.length) return this.formatErrorMessage(key, value, errors);
    }
  }, {
    key: 'checkRule',
    value: function checkRule(value, ruleName) {
      var rule = _lodash2.default.get('this.rules[ruleName].rule') || this.rules[ruleName];
      var customMessage = _lodash2.default.get('this.rules[ruleName].message');
      var errorMessage = this[ruleName](value, rule);
      return errorMessage ? customMessage || errorMessage : null;
    }
  }, {
    key: 'formatErrorMessage',
    value: function formatErrorMessage(key, value, errors) {
      return {
        label: this.rules.label || (0, _helpers.titleCase)(key),
        value: value,
        errors: this.rules.message ? [this.rules.message] : errors
      };
    }

    /**
     * Validate Rules
     */

  }, {
    key: 'required',
    value: function required(value, rule) {
      return rule === true && !value ? 'Is required' : '';
    }
  }, {
    key: 'in',
    value: function _in(value, possible) {
      return Array.isArray(possible) && possible.indexOf(value) !== -1 ? '' : 'Does not match possible values';
    }
  }]);

  return AnyValidator;
}();

exports.AnyRule = AnyRule;
exports.AnyValidator = AnyValidator;