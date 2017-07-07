import validate from './validate'
import _ from 'lodash'
import { AnyRule } from './rules/Any'
import { NumericRule } from './rules/Numeric'
import { StringRule } from './rules/String'

class Schema {

  constructor(schema, internals) {
    this.schema = schema || {}
    this.internals = internals || {}
    this.validate = this.validate.bind(this)
  }

  getSchema() {
    return this.schema
  }

  field(fieldName) {
    if (!(fieldName in this.schema)) throw new Error('The supplied field "' + fieldName + '" not found in schema')
    const field = this.schema[fieldName]
    const fieldJSON = _.cloneDeep(field.toJSON())
    switch (true) {
      case field instanceof NumericRule: return new NumericRule(fieldJSON)
      case field instanceof StringRule:  return new StringRule(fieldJSON)
      case field instanceof AnyRule:     return new AnyRule(fieldJSON)
      default:
    }
  }

  update(schema) {
    for (var field in schema) {
      if (!(schema[field] instanceof AnyRule)) throw new Error('Updates to schema require fields to be instances of a type of rule.')
      this.schema[field] = schema[field]
    }
    return this
  }

  toJSON() {
    let json = {}
    for (let key in this.schema) {
      json[key] = this.schema[key].toJSON()
    }
    return json
  }

  validate(values) {
    return validate(values, this)
  }

  onError(errorHandler) {
    this.internals.errorHandler = errorHandler
    return this
  }

  clone(fields = []) {
    if (!Array.isArray(fields)) throw new Error('argument supplied for fields must be an array')

    const optionalFields = {}
    const requiredFields = {}

    // Isolate an array of fields to use for the sub-schema and
    // create update objects for optional and required fields
    fields = fields.map(field => {
      const parts = field.split(':')
      if (parts.length === 2) {
        if (['o', 'opt', 'optional'].includes(parts[0])) optionalFields[parts[1]] = this.field(parts[1]).optional()
        if (['r', 'req', 'required'].includes(parts[0])) requiredFields[parts[1]] = this.field(parts[1]).required()
      }
      return parts[1] || parts[0]
    })

    // Create a new based on the fields
    const newSchema = new Schema(_.pick(this.schema, fields), Object.assign({}, this.internals))
    newSchema.update(optionalFields)
    newSchema.update(requiredFields)
    return newSchema
  }

}

export default Schema.bind(Schema)
