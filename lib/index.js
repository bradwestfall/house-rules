'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorFormat = exports.Schema = exports.Is = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _any = require('./any');

var _numeric = require('./numeric');

var _string = require('./string');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _errorFormat = require('./errorFormat');

var _errorFormat2 = _interopRequireDefault(_errorFormat);

var _validate = require('./validate');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IsFactory = function () {
  function IsFactory() {
    _classCallCheck(this, IsFactory);
  }

  _createClass(IsFactory, [{
    key: 'any',


    // Factories
    value: function any() {
      return new _any.AnyRule();
    }
  }, {
    key: 'numeric',
    value: function numeric(message) {
      return new _numeric.NumericRule({}, message);
    }
  }, {
    key: 'string',
    value: function string(message) {
      return new _string.StringRule({}, message);
    }
  }]);

  return IsFactory;
}();

var Is = new IsFactory();

exports.Is = Is;
exports.Schema = _schema2.default;
exports.errorFormat = _errorFormat2.default;