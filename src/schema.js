import validate from './validate'
import _ from 'lodash'

class Schema {

  constructor(schema, internals) {
    this.schema = schema || {}
    this.internals = internals || {}
  }

  // find(key) {
  //   return this.schema[key]
  // }

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

  clone(keys = []) {
    keys.forEach(key => {
      if (!(key in this.schema)) throw new Error(key + ' not found in schema')
    })
    return new Schema(_.pick(this.schema, keys), Object.assign({}, this.internals))
  }

}

export default Schema
