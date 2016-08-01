import validator from 'validator'
import { AnyRule, AnyValidator } from './any'

/****************************************
  Rule Builder
*****************************************/

class NumericRule extends AnyRule {

  constructor(rules, message) {
    super(rules)
    if (!this.hasRule('numeric') && typeof message === 'string') {
      this.rules.numeric = { numeric: true, message }
    } else {
      this.rules.numeric = true
    }
  }

  setRule(ruleName, rule, message) {
    let newRule = {
      [ruleName]: (typeof message === 'string') ? { rule, message } : rule
    }
    return new NumericRule(Object.assign({}, this.toJSON(), newRule))
  }

  integer(message) {
    return this.setRule('integer', true, message)
  }

  min(min, message) {
    return this.setRule('min', min, message)
  }

  max(max, message) {
    return this.setRule('max', max, message)
  }

  positive(message) {
    return this.setRule('positive', true, message)
  }

  negative(message) {
    return this.setRule('negative', true, message)
  }

  precision(places, message) {

  }

}

/****************************************
  Validator
*****************************************/

class NumericValidator extends AnyValidator {

  numeric(value, rule) {
    value = value + '' // coerse
    return rule === true && (validator.isNumeric(value) || validator.isDecimal(value))
      ? '' : 'Invalid number'
  }

  integer(value, rule) {
    return rule === true && validator.isInt(value + '') ? '': 'Invalid integer'
  }

  min(value, rule) {
    return value > rule ? '' : 'Must me bigger than ' + rule
  }

  max(value, rule) {
    return value < rule ? '' : 'Must me smaller than ' + rule
  }

  positive(value, rule) {
    return rule === true && value > 0 ? '' : 'Value must be positive'
  }

  negative(value, rule) {
    return rule === true && value < 0 ? '' : 'Value must be negative'
  }

}

export { NumericRule, NumericValidator }
