import { Is, Schema, errorFormat } from '../lib'

// Base Rules
let id = Is.numeric().positive().integer().required()
let title = Is.string().length(40).required()

// Schema Inventory
const schema = new Schema({
  email: Is.string().email().required(),
  password: Is.string().ascii().minLength(8).maxLength(100),
  userId: id.label('User ID'),
  userTypeId: Is.numeric().in([1, 2, 3]).required()
})


let loginFormSchema = schema.clone(['email', 'password'])

let errors = loginFormSchema.validate({
  email: 'test@test.com',
  password: 'somepassword'
})

console.log(errors) // outputs {}
