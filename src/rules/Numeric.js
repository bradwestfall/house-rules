import validator from 'validator'
import { AnyRule, AnyValidator } from './Any'
import { isNumeric, cleanObject } from '../helpers'


/****************************************
  Rule Builder
*****************************************/

class NumericRule extends AnyRule {

  constructor(rules, message) {
    super(rules)

    // If this object is being made for the first time (and not chained as `setRule` does below)
    if (!this.getRule('type')) {
      this.rules.type = message ? { rule: 'numeric', message } : 'numeric'
    }
  }

  setRule(ruleName, rule, options = {}) {
    if (typeof ruleName !== 'string') throw new Error('"ruleName" argument should be a string')
    return new NumericRule(Object.assign({}, this.toJSON(), {
      [ruleName]: (!Object.keys(options).length) ? rule : Object.assign({}, options, { rule })
    }))
  }

  toNumber(n) {
    const coersedNumber = n + ''
    if (!isNumeric(coersedNumber)) throw new Error('toNumber() expects a numeric string. ' + n + ' was given.')
    if (validator.isInt(coersedNumber)) return validator.toInt(coersedNumber)
    if (validator.isFloat(coersedNumber)) return validator.toFloat(coersedNumber)
  }

  integer(message) {
    return this.setRule('integer', true, cleanObject({ message }))
  }

  float(precision, message) {
    return this.setRule('float', true, cleanObject({ precision, message }))
  }

  min(min, message) {
    return this.setRule('min', this.toNumber(min), cleanObject({ message }))
  }

  max(max, message) {
    return this.setRule('max', this.toNumber(max), cleanObject({ message }))
  }

  positive(message) {
    return this.setRule('positive', true, cleanObject({ message }))
  }

  negative(message) {
    return this.setRule('negative', true, cleanObject({ message }))
  }

}

/****************************************
  Validator
*****************************************/

class NumericValidator extends AnyValidator {

  type(value) {
    return (isNumeric(value + '')) ? '' : 'Invalid number'
  }

  integer(value, rule) {
    return validator.isInt(value + '') ? '' : 'Invalid integer'
  }

  float(value, rule, options) {
    if (!validator.isFloat(value + '')) return 'Invalid float'
    if (Number(value) % 1 !== 0) { // has decimal places
      const parts = (value + '').split('.')
      if (parseInt(parts[1].length) > parseInt(options.precision)) return 'Cannot have more than ' + options.precision + ' decimal places'
    }
    return ''
  }

  minMaxChecker(value, rules) {
    if (validator.isInt(value)) {
      return validator.isInt(value, rules)
    } else if (validator.isFloat(value)) {
      return validator.isFloat(value, rules)
    }
  }

  min(value, rule) {
    return this.minMaxChecker(value + '', { min: rule }) ? '' : 'Must me bigger than ' + rule
  }

  max(value, rule) {
    return this.minMaxChecker(value + '', { max: rule }) ? '' : 'Must me smaller than ' + rule
  }

  positive(value) {
    return Number(value) > 0 ? '' : 'Value must be positive'
  }

  negative(value) {
    return Number(value) < 0 ? '' : 'Value must be negative'
  }

}

export { NumericRule, NumericValidator }
