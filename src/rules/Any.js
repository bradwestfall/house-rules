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

  setRule(ruleName, rule, options) {
    return new AnyRule(Object.assign({}, this.toJSON(), {
      [ruleName]: (typeof options === undefined) ? rule : Object.assign({}, options, { rule })
    }))
  }

  getRule(ruleName) {
    if (typeof ruleName !== 'string') throw new Error('"ruleName" argument should be a string')
    return this.rules[ruleName]
  }

  removeRule(ruleName) {
    delete this.rules[ruleName]
  }

  toJSON() {
    return this.rules
  }


  /**
   * Error Customizations
   */

  // Use a "catch-all" message that overrides all other messages
  message(message) {
    if (typeof message !== 'string') throw new Error('"message" should be a string')
    return this.setRule('message', message)
  }

  // Custom Labels
  label(label) {
    if (typeof label !== 'string') throw new Error('"label" should be a string')
    return this.setRule('label', label)
  }

  /**
   * Rules
   */

  required(message) {
    return this.setRule('required', true, { message })
  }

  optional() {
    this.removeRule('required')
    return this
  }

  in(possible, message) {
    if (!Array.isArray(possible)) throw new Error('"possible" should be an array')
    return this.setRule('in', possible, { message })
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

    // Check requiredness before all other rules. Failing required-ness means no other
    // validation is nessesary
    const requiredErrorMessage = this.checkRule(value, 'required')
    if (requiredErrorMessage) return this.formatErrorMessage(key, value, requiredErrorMessage)

    // If the value is required, then the above "required" validation would have returned by now.
    // But if the value is empty and not required, then there's no point in continuing validation
    if (value === '') return

    // Check Type. Failing type means no other validation is nessesary
    const typeErrorMessage = this.checkRule(value, 'type')
    if (typeErrorMessage) return this.formatErrorMessage(key, value, typeErrorMessage)

    // Check everything else
    let err
    for (var ruleName in this.rules) {

      // Already checked
      if (ruleName !== 'required' && ruleName !== 'type') {
        err = this.checkRule(value, ruleName)
        if (err) errors.push(err)
      }
    }

    // Only return errors if some were found
    if (errors.length) return this.formatErrorMessage(key, value, errors)

  }

  checkRule(value, ruleName) {

    // Establish rule, message, and options
    if (this.rules[ruleName]) {
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
    errors = Array.isArray(errors) ? errors : [ errors ]
    return {
      label: this.rules.label || camelToLabel(key),
      value: value,

      // Use overriding message if one was provided
      errors: this.rules.message ? [ this.rules.message ] : errors
    }
  }

  /**
   * Validate Rules
   */

  required(value, rule) {
    const empty = (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '') ||
      (Array.isArray(value) && value.length === 0) ||
      (_.isPlainObject(value) && Object.keys(value).length === 0)
    )
    return rule === true && empty ? 'Is required' : ''
  }

  in(value, possible) {
    return Array.isArray(possible) && possible.indexOf(value) !== -1 ? '' : 'Does not match possible values'
  }

}

export { AnyRule, AnyValidator }
