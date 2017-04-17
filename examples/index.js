import { Is, Schema, errorFormat, validate } from '../src'

// // Base Rules
// const id = Is.numeric().positive().integer().required()
// const title = Is.string().length(40).required()

// // Schema Inventory
// const schema = new Schema({
//   // email: Is.string().email().required(),
//   // password: Is.string().ascii().minLength(8).maxLength(100).required(),
//   // userId: id.label('User ID'),
//   // userTypeId: Is.numeric().in([1, 2, 3]).required(),
//   // objectId: Is.string().regex(/^[a-f\d]{24}$/i),

//   number: Is.numeric().min('400')
// })


// const subSchema = schema.clone(['number'])

// const errors = subSchema.validate({
//   number: '123'
// })

// console.log(errors)


// import _ from 'lodash'

// const value = {}
// console.log(_.isPlainObject(value) && Object.keys(value).length === 0)



