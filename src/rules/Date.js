import validator from 'validator'
import moment from 'moment'
import { AnyRule, AnyValidator } from './Any'
import { cleanObject } from '../helpers'

const formatErrorDate = date => {
  return moment(date, 'YYYY-MM-DD').format('MMM Do, YYYY')
}

/****************************************
  Rule Builder
*****************************************/

class DateRule extends AnyRule {

  constructor(rules, format = 'YYYY/MM/DD', message) {
    super(rules)

    // If this object is being made for the first time (and not chained as `setRule` does below)
    if (!this.getRule('type')) {
      this.rules.type = cleanObject({ rule: 'date', format, message })
    }
  }

  setRule(ruleName, rule, options = {}) {
    if (typeof ruleName !== 'string') throw new Error('`ruleName` argument should be a string')

    // Ensure format gets passed along to the next instance of new DateRule
    const { format } = this.rules.type

    return new DateRule(Object.assign({}, this.toJSON(), {
      [ruleName]: Object.assign({}, options, { rule, format })
    }))
  }

  isSame(date, message) {
    if (!moment(date, 'YYYY-MM-DD', true).isValid()) throw new Error('`isSame` expects date in YYYY-MM-DD format')
    return this.setRule('isSame', date, cleanObject({ message }))
  }

  isSameOrBefore(date, message) {
    if (!moment(date, 'YYYY-MM-DD', true).isValid()) throw new Error('`isSameOrBefore` expects date in YYYY-MM-DD format')
    return this.setRule('isSameOrBefore', date, cleanObject({ message }))
  }

  isSameOrAfter(date, message) {
    if (!moment(date, 'YYYY-MM-DD', true).isValid()) throw new Error('`isSameOrAfter` expects date in YYYY-MM-DD format')
    return this.setRule('isSameOrAfter', date, cleanObject({ message }))
  }

  isBefore(beforeDate, message) {
    if (!moment(beforeDate, 'YYYY-MM-DD', true).isValid()) throw new Error('`isBefore` expects date in YYYY-MM-DD format')
    return this.setRule('isBefore', beforeDate, cleanObject({ message }))
  }

  isBeforeToday(message) {
    return this.setRule('isBeforeToday', moment(new Date()).format('YYYY-MM-DD'), cleanObject({ message }))
  }

  isAfter(afterDate, message) {
    if (!moment(afterDate, 'YYYY-MM-DD', true).isValid()) throw new Error('`isAfter` expects date in YYYY-MM-DD format')
    return this.setRule('isAfter', afterDate, cleanObject({ message }))
  }

  isAfterToday(message) {
    return this.setRule('isAfterToday', moment(new Date()).format('YYYY-MM-DD'), cleanObject({ message }))
  }

  isMonday(message) {
    return this.setRule('isMonday', true, cleanObject({ message }))
  }

  isTuesday(message) {
    return this.setRule('isTuesday', true, cleanObject({ message }))
  }

  isWednesday(message) {
    return this.setRule('isWednesday', true, cleanObject({ message }))
  }

  isThursday(message) {
    return this.setRule('isThursday', true, cleanObject({ message }))
  }

  isFriday(message) {
    return this.setRule('isFriday', true, cleanObject({ message }))
  }

  isSaturday(message) {
    return this.setRule('isSaturday', true, cleanObject({ message }))
  }

  isSunday(message) {
    return this.setRule('isSunday', true, cleanObject({ message }))
  }

}


/****************************************
  Validator
*****************************************/

class DateValidator extends AnyValidator {

  type(value, rule, options) {
    const valid = moment(value, options.format, true).isValid()
    return valid ? '' : 'Invalid date'
  }

  isSame(value, date, options) {
    const valid = moment(value, options.format, true).isSame(date)
    return valid ? '' : `Must be ${formatErrorDate(date)}`
  }

  isSameOrBefore(value, date, options) {
    const valid = moment(value, options.format, true).isSameOrBefore(date)
    return valid ? '' : `Must be the same or before ${formatErrorDate(date)}`
  }

  isSameOrAfter(value, date, options) {
    const valid = moment(value, options.format, true).isSameOrAfter(date)
    return valid ? '' : `Must be the same or after ${formatErrorDate(date)}`
  }

  isBefore(value, beforeDate, options) {
    const valid = moment(value, options.format, true).isBefore(beforeDate)
    return valid ? '' : `Must be before ${formatErrorDate(beforeDate)}`
  }

  isBeforeToday(value, today, options) {
    const valid = moment(value, options.format, true).isBefore(today)
    return valid ? '' : `Must be before today ${formatErrorDate(today)})`
  }

  isAfter(value, afterDate, options) {
    const valid = moment(value, options.format, true).isAfter(afterDate)
    return valid ? '' : `Must be after ${formatErrorDate(afterDate)}`
  }

  isAfterToday(value, today, options) {
    const valid = moment(value, options.format, true).isAfter(today)
    return valid ? '' : `Must be after today ${formatErrorDate(today)})`
  }

  isMonday(value, rule, options) {
    const valid = moment(value, options.format, true).format('dddd') === 'Monday'
    return valid ? '' : 'Must be a Monday'
  }

  isTuesday(value, rule, options) {
    const valid = moment(value, options.format, true).format('dddd') === 'Tuesday'
    return valid ? '' : 'Must be a Tuesday'
  }

  isWednesday(value, rule, options) {
    const valid = moment(value, options.format, true).format('dddd') === 'Wednesday'
    return valid ? '' : 'Must be a Wednesday'
  }

  isThursday(value, rule, options) {
    const valid = moment(value, options.format, true).format('dddd') === 'Thursday'
    return valid ? '' : 'Must be a Thursday'
  }

  isFriday(value, rule, options) {
    const valid = moment(value, options.format, true).format('dddd') === 'Friday'
    return valid ? '' : 'Must be a Friday'
  }

  isSaturday(value, rule, options) {
    const valid = moment(value, options.format, true).format('dddd') === 'Saturday'
    return valid ? '' : 'Must be a Saturday'
  }

  isSunday(value, rule, options) {
    const valid = moment(value, options.format, true).format('dddd') === 'Sunday'
    return valid ? '' : 'Must be a Sunday'
  }

}

export { DateRule, DateValidator }
