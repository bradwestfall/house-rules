import { Is, Schema, errorFormat } from '../src'

// Base Rules
let id = Is.numeric().positive().integer().required()
let title = Is.string().length(40).required()

// Schema Inventory
const schema = new Schema({
  email: Is.string().email().required(),
  password: Is.string().ascii().minLength(8).maxLength(100).required(),
  userId: id.label('User ID'),
  userTypeId: Is.numeric().in([1, 2, 3]).required(),
  objectId: Is.string().regex(/^[a-f\d]{24}$/i)
})


let loginFormSchema = schema.clone(['password'])

let errors = loginFormSchema.validate({
  password: null
})

console.log(errors) // outputs {}
