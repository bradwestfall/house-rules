import _ from 'lodash'
import { AnyRule, AnyValidator } from './any'
import { NumericRule, NumericValidator } from './numeric'
import { StringRule, StringValidator } from './string'
import Schema from './schema'

const validate = function(values, schema) {
  if (!values) throw new Error('`values` must be supplied')
  if (!schema) throw new Error('`schema` must be supplied')
  let rawSchema = schema instanceof Schema ? schema.get() : schema
  let allErrors = {}

  for (var key in rawSchema) {
    let rules = rawSchema[key]
    let errors

    // Number
    if (rules instanceof NumericRule) {
      let numericValidator = new NumericValidator(rules)
      errors = numericValidator.check(key, values[key])

    // String
    } else if (rules instanceof StringRule) {
      let stringValidator = new StringValidator(rules)
      errors = stringValidator.check(key, values[key])

    }

    if (errors) allErrors[key] = errors

  }

  return _.get(schema, 'internals.errorHandler') ? schema.internals.errorHandler(allErrors) : allErrors

}

export default validate
