import validator from 'validator'
import { AnyRule, AnyValidator } from './Any'

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

  setRule(ruleName, rule, options) {
    if (typeof ruleName !== 'string') throw new Error('"ruleName" argument should be a string')
    return new StringRule(Object.assign({}, this.toJSON(), {
      [ruleName]: (typeof options === 'undefined') ? rule : Object.assign({}, options, { rule })
    }))
  }

  length(length, message) {
    return this.setRule('length', length, { message })
  }

  maxLength(maxLength, message) {
    return this.setRule('maxLength', maxLength, { message })
  }

  minLength(minLength, message) {
    return this.setRule('minLength', minLength, { message })
  }

  regex(expression, message) {
    if (typeof expression === 'string') throw new Error('Expressions should be Expression Literals, not Strings')
    if (!(expression instanceof RegExp)) throw new Error('This is not a regular expression')
    return this.setRule('regex', expression, { message })
  }

  email(message) {
    return this.setRule('email', true, { message })
  }

  ascii(message) {
    return this.setRule('ascii', true, { message })
  }

  alpha(strict = true, message) {
    return this.setRule('alpha', true, { strict: !!strict, message })
  }

  alphaNum(strict = true, message) {
    return this.setRule('alphaNum', true, { strict: !!strict, message })
  }

  lowercase(message) {
    return this.setRule('lowercase', true, { message })
  }

  uppercase(message) {
    return this.setRule('uppercase', true, { message })
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
    const valid = options.strict ? validator.isAlpha(value) : (/^[\w\s]+$/i.test(value))
    return valid ? '' : 'Must only contain alphabetic characters'
  }

  alphaNum(value, rule, options = {}) {
    const valid = options.strict ? validator.isAlphanumeric(value) : (/^[\w\s\d]+$/i.test(value))
    return valid ? '' : 'Must only contain alphabetic or numeric characters'
  }

  lowercase(value) {
    return validator.isLowercase(value) ? '' : 'Must be losercase'
  }

  uppercase(value) {
    return validator.isUppercase(value) ? '' : 'Must be uppercase'
  }

}

export { StringRule, StringValidator }
