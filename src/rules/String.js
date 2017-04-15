import validator from 'validator'
import { AnyRule, AnyValidator } from './Any'

/****************************************
  Rule Builder
*****************************************/

class StringRule extends AnyRule {

  constructor(rules, message) {
    super(rules)

    // Establish "string" rule
    if (!this.getRule('string') && typeof message === 'string') {
      this.rules.string = { string: true, message }
    } else {
      this.rules.string = true
    }
  }

  setRule(ruleName, rule, message) {
    const newRule = {
      [ruleName]: (typeof message === 'string') ? { rule, message } : rule
    }
    return new StringRule(Object.assign({}, this.toJSON(), newRule))
  }

  length(length, message) {
    return this.maxLength(length, message)
  }

  maxLength(maxLength, message) {
    return this.setRule('maxLength', maxLength, message)
  }

  minLength(minLength, message) {
    return this.setRule('minLength', minLength, message)
  }

  regex(expression, message) {
    if (typeof expression === 'string') throw new Error('Expressions should be Expression Literals, not Strings')
    if (!(expression instanceof RegExp)) throw new Error('This is not a regular expression')
    return this.setRule('regex', expression, message)
  }

  email(message) {
    return this.setRule('email', true, message)
  }

  ascii(message) {
    return this.setRule('ascii', true, message)
  }

  isAlpha(message) {
    return this.setRule('alpha', true, message)
  }

  isAlphaNum(message) {
    return this.setRule('alphaNum', true, message)
  }

}

/****************************************
  Validator
*****************************************/

class StringValidator extends AnyValidator {

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

  alpha(value) {
    return validator.isAlpha(value) ? '' : 'Must only contain alphabetic characters'
  }

  alphaNum(value) {
    return validator.isAlphanumeric(value) ? '' : 'Must only contain alphabetic or numeric characters'
  }

}

export { StringRule, StringValidator }
