'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringValidator = exports.StringRule = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _any = require('./any');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/****************************************
  Rule Builder
*****************************************/

var StringRule = function (_AnyRule) {
  _inherits(StringRule, _AnyRule);

  function StringRule(rules, message) {
    _classCallCheck(this, StringRule);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StringRule).call(this, rules));

    if (!_this.hasRule('string') && typeof message === 'string') {
      _this.rules.string = { string: true, message: message };
    } else {
      _this.rules.string = true;
    }
    return _this;
  }

  _createClass(StringRule, [{
    key: 'setRule',
    value: function setRule(ruleName, rule, message) {
      var newRule = _defineProperty({}, ruleName, typeof message === 'string' ? { rule: rule, message: message } : rule);
      return new StringRule(Object.assign({}, this.toJSON(), newRule));
    }
  }, {
    key: 'length',
    value: function length(_length, message) {
      return this.maxLength(_length, message);
    }
  }, {
    key: 'maxLength',
    value: function maxLength(_maxLength, message) {
      return this.setRule('maxLength', _maxLength, message);
    }
  }, {
    key: 'minLength',
    value: function minLength(_minLength, message) {
      return this.setRule('minLength', _minLength, message);
    }
  }, {
    key: 'regex',
    value: function regex(expression, message) {
      if (typeof expression === 'string') expression = new RegExp(expression);
      if (!(expression instanceof RegExp)) throw new Error('This is not a regular expression');
      return this.setRule('regex', expression, message);
    }
  }, {
    key: 'email',
    value: function email(message) {
      return this.setRule('email', true, message);
    }
  }, {
    key: 'ascii',
    value: function ascii(message) {
      return this.setRule('ascii', true, message);
    }
  }, {
    key: 'isAlpha',
    value: function isAlpha(message) {
      return this.setRule('alpha', true, message);
    }
  }, {
    key: 'isAlphaNum',
    value: function isAlphaNum(message) {
      return this.setRule('alphaNum', true, message);
    }
  }]);

  return StringRule;
}(_any.AnyRule);

/****************************************
  Validator
*****************************************/

var StringValidator = function (_AnyValidator) {
  _inherits(StringValidator, _AnyValidator);

  function StringValidator() {
    _classCallCheck(this, StringValidator);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StringValidator).apply(this, arguments));
  }

  _createClass(StringValidator, [{
    key: 'maxLength',
    value: function maxLength(value, _maxLength2) {
      return value.length <= _maxLength2 ? '' : 'Cannot exceed ' + _maxLength2 + ' characters';
    }
  }, {
    key: 'minLength',
    value: function minLength(value, _minLength2) {
      return value.length >= _minLength2 ? '' : 'Must be at least' + _minLength2 + ' characters';
    }
  }, {
    key: 'regex',
    value: function regex(value, expression) {
      return expression.test(value) ? '' : 'Is not valid';
    }
  }, {
    key: 'email',
    value: function email(value) {
      return _validator2.default.isEmail(value) ? '' : 'Is not a valid email';
    }
  }, {
    key: 'ascii',
    value: function ascii(value) {
      return _validator2.default.isAscii(value) ? '' : 'Must only contain ASCII characters';
    }
  }, {
    key: 'alpha',
    value: function alpha(value) {
      return _validator2.default.isAlpha(value) ? '' : 'Must only contain alphabetic characters';
    }
  }, {
    key: 'alphaNum',
    value: function alphaNum(value) {
      return _validator2.default.isAlphanumeric(value) ? '' : 'Must only contain alphabetic or numeric characters';
    }
  }]);

  return StringValidator;
}(_any.AnyValidator);

exports.StringRule = StringRule;
exports.StringValidator = StringValidator;