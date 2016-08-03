'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumericValidator = exports.NumericRule = undefined;

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

var NumericRule = function (_AnyRule) {
  _inherits(NumericRule, _AnyRule);

  function NumericRule(rules, message) {
    _classCallCheck(this, NumericRule);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NumericRule).call(this, rules));

    if (!_this.hasRule('numeric') && typeof message === 'string') {
      _this.rules.numeric = { numeric: true, message: message };
    } else {
      _this.rules.numeric = true;
    }
    return _this;
  }

  _createClass(NumericRule, [{
    key: 'setRule',
    value: function setRule(ruleName, rule, message) {
      var newRule = _defineProperty({}, ruleName, typeof message === 'string' ? { rule: rule, message: message } : rule);
      return new NumericRule(Object.assign({}, this.toJSON(), newRule));
    }
  }, {
    key: 'integer',
    value: function integer(message) {
      return this.setRule('integer', true, message);
    }
  }, {
    key: 'min',
    value: function min(_min, message) {
      return this.setRule('min', _min, message);
    }
  }, {
    key: 'max',
    value: function max(_max, message) {
      return this.setRule('max', _max, message);
    }
  }, {
    key: 'positive',
    value: function positive(message) {
      return this.setRule('positive', true, message);
    }
  }, {
    key: 'negative',
    value: function negative(message) {
      return this.setRule('negative', true, message);
    }
  }, {
    key: 'precision',
    value: function precision(places, message) {}
  }]);

  return NumericRule;
}(_any.AnyRule);

/****************************************
  Validator
*****************************************/

var NumericValidator = function (_AnyValidator) {
  _inherits(NumericValidator, _AnyValidator);

  function NumericValidator() {
    _classCallCheck(this, NumericValidator);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NumericValidator).apply(this, arguments));
  }

  _createClass(NumericValidator, [{
    key: 'numeric',
    value: function numeric(value, rule) {
      value = value + ''; // coerse
      return rule === true && (_validator2.default.isNumeric(value) || _validator2.default.isDecimal(value)) ? '' : 'Invalid number';
    }
  }, {
    key: 'integer',
    value: function integer(value, rule) {
      return rule === true && _validator2.default.isInt(value + '') ? '' : 'Invalid integer';
    }
  }, {
    key: 'min',
    value: function min(value, rule) {
      return value > rule ? '' : 'Must me bigger than ' + rule;
    }
  }, {
    key: 'max',
    value: function max(value, rule) {
      return value < rule ? '' : 'Must me smaller than ' + rule;
    }
  }, {
    key: 'positive',
    value: function positive(value, rule) {
      return rule === true && value > 0 ? '' : 'Value must be positive';
    }
  }, {
    key: 'negative',
    value: function negative(value, rule) {
      return rule === true && value < 0 ? '' : 'Value must be negative';
    }
  }]);

  return NumericValidator;
}(_any.AnyValidator);

exports.NumericRule = NumericRule;
exports.NumericValidator = NumericValidator;