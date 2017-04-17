import validator from 'validator'
import { AnyRule, AnyValidator } from './Any'
import { isNumeric } from '../helpers'

/****************************************
  Rule Builder
*****************************************/

class NumericRule extends AnyRule {

  constructor(rules, message) {
    super(rules)

    // If this object is being made for the first time (and not chained as `setRule` does below)
    if (!this.getRule('type')) {
      this.rules.type = { rule: 'string', message }
    } else {
      this.rules.type = 'string'
    }
  }

  setRule(ruleName, rule, options) {
    return new NumericRule(Object.assign({}, this.toJSON(), {
      [ruleName]: (typeof options === undefined) ? rule : Object.assign({}, options, { rule })
    }))
  }

  toNumber(n) {
    const coersedNumber = n + ''
    if (!isNumeric(coersedNumber)) throw new Error('toNumber() expects a numeric string. ' + n + ' was given.')
    if (validator.isInt(coersedNumber)) return validator.toInt(coersedNumber)
    if (validator.isFloat(coersedNumber)) return validator.toFloat(coersedNumber)
  }

  integer(message) {
    return this.setRule('integer', true, { message })
  }

  min(min, message) {
    return this.setRule('min', this.toNumber(min), { message })
  }

  max(max, message) {
    return this.setRule('max', this.toNumber(max), { message })
  }

  positive(message) {
    return this.setRule('positive', true, { message })
  }

  negative(message) {
    return this.setRule('negative', true, { message })
  }

  precision(places, message) {
    // todo
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
    return rule === true && validator.isInt(value + '') ? '': 'Invalid integer'
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

  positive(value, rule) {
    return rule === true && value > 0 ? '' : 'Value must be positive'
  }

  negative(value, rule) {
    return rule === true && value < 0 ? '' : 'Value must be negative'
  }

}

export { NumericRule, NumericValidator }
