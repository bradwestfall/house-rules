import _ from 'lodash'
import { titleCase } from './helpers'

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

  hasRule(ruleName) {
    if (typeof ruleName !== 'string') throw new Error('"ruleName" should be a string')
    return this.rules[ruleName]
  }

  toJSON() {
    return this.rules
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

  message(message) {
    if (typeof message !== 'string') throw new Error('"message" should be a string')
    return this.setRule('message', message)
  }

  label(label) {
    if (typeof label !== 'string') throw new Error('"label" should be a string')
    return this.setRule('label', label)
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

    // Check Value ( as string )
    let checkValue = (
      value === null ||
      value === undefined ||
      value.trim() === ''
      ) ? '' : '' + value

    // Check requiredness before all other rules
    let requiredErrorMessage = this.checkRule(checkValue, 'required')
    if (requiredErrorMessage) return this.formatErrorMessage(key, value, [ requiredErrorMessage ])

    // Check everything else
    for (var ruleName in this.rules) {
      if (typeof this[ruleName] === 'function' && ruleName !== 'required') {
          errors.push(this.checkRule(checkValue, ruleName))
      }
    }

    // Normalize Errors
    errors = _.without(errors, null, undefined, '')

    // Only return errors if some were found
    if (errors.length) return this.formatErrorMessage(key, value, errors)

  }

  checkRule(value, ruleName) {
    let rule = _.get('this.rules[ruleName].rule') || this.rules[ruleName]
    let customMessage = _.get('this.rules[ruleName].message')
    let errorMessage = this[ruleName](value, rule)
    return errorMessage ? (customMessage || errorMessage) : null
  }

  formatErrorMessage(key, value, errors) {
    return {
      label: this.rules.label || titleCase(key),
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
