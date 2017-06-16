import validate from './validate'
import _ from 'lodash'
import { AnyRule } from './rules/Any'
import { NumericRule } from './rules/Numeric'
import { StringRule } from './rules/String'
import { clone } from './helpers'

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
    const fieldJSON = clone(field.toJSON())
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
    fields.forEach(field => {
      if (!(field in this.schema)) throw new Error('The supplied field "' + field + '" not found in schema')
    })
    return new Schema(_.pick(this.schema, fields), Object.assign({}, this.internals))
  }

}

export default Schema.bind(Schema)
