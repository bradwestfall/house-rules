import validate from './validate'
import _ from 'lodash'

class Schema {

  constructor(schema, internals) {
    this.schema = schema || {}
    this.internals = internals || {}
  }

  get() {
    return this.schema
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
