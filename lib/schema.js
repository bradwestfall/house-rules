'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validate2 = require('./validate');

var _validate3 = _interopRequireDefault(_validate2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = function () {
  function Schema(schema, internals) {
    _classCallCheck(this, Schema);

    this.schema = schema || {};
    this.internals = internals || {};
  }

  // find(key) {
  //   return this.schema[key]
  // }

  _createClass(Schema, [{
    key: 'get',
    value: function get() {
      return this.schema;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var json = {};
      for (var key in this.schema) {
        json[key] = this.schema[key].toJSON();
      }
      return json;
    }
  }, {
    key: 'validate',
    value: function validate(values) {
      return (0, _validate3.default)(values, this);
    }
  }, {
    key: 'onError',
    value: function onError(errorHandler) {
      this.internals.errorHandler = errorHandler;
      return this;
    }
  }, {
    key: 'clone',
    value: function clone() {
      var _this = this;

      var keys = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      keys.forEach(function (key) {
        if (!(key in _this.schema)) throw new Error(key + ' not found in schema');
      });
      return new Schema(_lodash2.default.pick(this.schema, keys), Object.assign({}, this.internals));
    }
  }]);

  return Schema;
}();

exports.default = Schema;