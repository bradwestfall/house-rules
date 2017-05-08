import validator from 'validator'
import { AnyRule, AnyValidator } from './Any'
import { cleanObject } from '../helpers'


/****************************************
  Rule Builder
*****************************************/

class StringRule extends AnyRule {

  constructor(rules, message) {
    super(rules)

    // If this object is being made for the first time (and not chained as `setRule` does below)
    if (!this.getRule('type')) {
      this.rules.type = message ? { rule: 'string', message } : 'string'
    }
  }

  setRule(ruleName, rule, options = {}) {
    if (typeof ruleName !== 'string') throw new Error('"ruleName" argument should be a string')
    return new StringRule(Object.assign({}, this.toJSON(), {
      [ruleName]: (!Object.keys(options).length) ? rule : Object.assign({}, options, { rule })
    }))
  }

  length(length, message) {
    return this.setRule('length', length, cleanObject({ message }))
  }

  maxLength(maxLength, message) {
    return this.setRule('maxLength', maxLength, cleanObject({ message }))
  }

  minLength(minLength, message) {
    return this.setRule('minLength', minLength, cleanObject({ message }))
  }

  regex(expression, message) {
    if (typeof expression === 'string') throw new Error('Expressions should be Expression Literals, not Strings')
    if (!(expression instanceof RegExp)) throw new Error('This is not a regular expression')
    return this.setRule('regex', expression, cleanObject({ message }))
  }

  email(message) {
    return this.setRule('email', true, cleanObject({ message }))
  }

  ascii(message) {

    return this.setRule('ascii', true, cleanObject({ message }))
  }

  alpha(strict = true, message) {
    return this.setRule('alpha', true, cleanObject({ strict: !!strict, message }))
  }

  alphaNum(strict = true, message) {
    return this.setRule('alphaNum', true, cleanObject({ strict: !!strict, message }))
  }

  lowercase(message) {
    return this.setRule('lowercase', true, cleanObject({ message }))
  }

  uppercase(message) {
    return this.setRule('uppercase', true, cleanObject({ message }))
  }

}


/****************************************
  Validator
*****************************************/

class StringValidator extends AnyValidator {

  type(value) {
    return (typeof value === 'string') ? '' : 'Invalid string'
  }

  length(value, length) {
    return (value.length === length) ? '' : 'Must be ' + length + ' characters'
  }

  maxLength(value, maxLength) {
    return (value.length <= maxLength) ? '' : 'Cannot exceed ' + maxLength + ' characters'
  }

  minLength(value, minLength) {
    return (value.length >= minLength) ? '' : 'Must be at least ' + minLength + ' characters'
  }

  regex(value, expression) {
    return expression.test(value) ? '' : 'Is not valid'
  }

  email(value) {
    return validator.isEmail(value) ? '' : 'Is not a valid email'
  }

  ascii(value) {
    return validator.isAscii(value) ? '' : 'Must only contain ASCII characters'
  }

  alpha(value, rule, options = {}) {
    if (options.strict) {
      return validator.isAlpha(value) ? '' : 'Must only contain alphabetic characters'
    } else {
      return validator.isAlpha(value.replace(/[\s]+/g, '')) ? '' : 'Must only contain alphabetic and whitespace characters'
    }
  }

  alphaNum(value, rule, options = {}) {
    if (options.strict) {
      return validator.isAlphanumeric(value) ? '' : 'Must only contain alphabetic or numeric characters'
    } else {
      return validator.isAlphanumeric(value.replace(/[\s]+/g, '')) ? '' : 'Must only contain alphabetic, numeric, and whitespace characters'
    }
  }

  lowercase(value) {
    return validator.isLowercase(value) ? '' : 'Must be lowercase'
  }

  uppercase(value) {
    return validator.isUppercase(value) ? '' : 'Must be uppercase'
  }

}

export { StringRule, StringValidator }
