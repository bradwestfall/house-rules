import _ from 'lodash'
import { camelToLabel } from '../helpers'

/****************************************
  Rule Builder
*****************************************/

class AnyRule {

  /**
   * Utilities
   */

  constructor(rules) {
    this.rules = rules || {}
  }

  getRule(ruleName) {
    if (typeof ruleName !== 'string') throw new Error('"ruleName" should be a string')
    return this.rules[ruleName]
  }

  toJSON() {
    return this.rules
  }


  /**
   * Customizing Errors
   */

  message(message) {
    if (typeof message !== 'string') throw new Error('"message" should be a string')
    return this.setRule('message', message)
  }

  label(label) {
    if (typeof label !== 'string') throw new Error('"label" should be a string')
    return this.setRule('label', label)
  }

  /**
   * Rules
   */

  required(message) {
    return this.setRule('required', true, message)
  }

  optional() {
    return this.setRule('required', false)
  }

  in(possible, message) {
    if (!Array.isArray(possible)) throw new Error('"possible" should be an array')
    return this.setRule('in', possible, message)
  }


}

/****************************************
  Validator
*****************************************/

class AnyValidator {

  /**
   * Utilities
   */

  constructor(rules) {
    this.rules  = rules.toJSON() || {}
  }

  check(key, value) {

    // Collect errors
    let errors = []

    // The value which will be checked
    const normalizedValue = this.normalizeValue(value)

    // Check requiredness before all other rules. Failing required-ness means no other
    // validation is nessesary
    const requiredErrorMessage = this.checkRule(normalizedValue, 'required')
    if (requiredErrorMessage) return this.formatErrorMessage(key, value, [ requiredErrorMessage ])

    // If the value is required, then the above "required" validation would have returned by now
    // If the value is not required as is empty, then there's no point in continuing validation
    if (normalizedValue === '') return

    // Check Type. Failing type means no other validation is nessesary
    const typeErrorMessage = this.checkType(normalizedValue)
    if (typeErrorMessage) return this.formatErrorMessage(key, value, [ typeErrorMessage ])

    // Check everything else
    let err
    for (var ruleName in this.rules) {
      if (ruleName !== 'required') {
        err = this.checkRule(normalizedValue, ruleName)
        if (err) errors.push(err)
      }
    }

    // Only return errors if some were found
    if (errors.length) return this.formatErrorMessage(key, value, errors)

  }

  normalizeValue(value) {
    if (value === null || value === undefined) return ''
    if (typeof value === 'string') return value.trim()
    return value
  }

  checkRule(value, ruleName) {

    // Establish `rule`, `message`, and `options`
    if (_.get(this, 'rules.' + ruleName)) {
      var { rule, message, ...options } = this.rules[ruleName]
    } else {
      var rule = this.rules[ruleName]
      var message = null
      var options = {}
    }

    // If the validation function exists, validate
    if (typeof this[ruleName] === 'function') {
      const errorMessage = this[ruleName](value, rule, options)
      return errorMessage ? (message || errorMessage) : null
    } else {
      return null
    }

  }

  formatErrorMessage(key, value, errors) {
    return {
      label: this.rules.label || camelToLabel(key),
      value: value,
      errors: this.rules.message ? [ this.rules.message ] : errors
    }
  }

  /**
   * Validate Rules
   */

  required(value, rule) {
    return rule === true && !value ? 'Is required' : ''
  }

  in(value, possible) {
    return Array.isArray(possible) && possible.indexOf(value) !== -1 ? '' : 'Does not match possible values'
  }

}

export { AnyRule, AnyValidator }
