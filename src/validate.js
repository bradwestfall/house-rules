import _ from 'lodash'
import { AnyRule, AnyValidator } from './rules/Any'
import { NumericRule, NumericValidator } from './rules/Numeric'
import { StringRule, StringValidator } from './rules/String'
import Schema from './Schema'

const validate = (values, schema) => {
  if (!values) throw new Error('`values` must be supplied')
  if (!schema) throw new Error('`schema` must be supplied')
  const rawSchema = schema instanceof Schema ? schema.get() : schema
  const allErrors = {}

  for (var key in rawSchema) {
    const rules = rawSchema[key]
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
