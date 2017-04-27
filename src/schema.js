import validate from './validate'
import _ from 'lodash'
import { AnyRule } from './rules/Any'

class Schema {

  constructor(schema, internals) {
    this.schema = schema || {}
    this.internals = internals || {}
  }

  getSchema() {
    return this.schema
  }

  fields(field) {
    return this.schema[field]
  }

  update(schema) {
    for (var field in schema) {
      if (!(schema[field] instanceof AnyRule)) throw new Error('Updates to schema require fields to be instances of a type of rule.')
      this.schema[field] = schema[field]
    }
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

export default Schema
