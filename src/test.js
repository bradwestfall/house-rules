import { Is, Schema, errorFormat } from './index'

// Base Rules
let id = Is.numeric().positive().integer().required()
let title = Is.string().length(40).required()

// Schema Inventory
const schema = new Schema({

  // General
  email: Is.string().email().required(),
  password: Is.string().ascii().minLength(8).maxLength(100),

  // Catalog
  catalogId: id.label('Catalog ID'),
  criticality: Is.numeric().in([1, 2, 3, 4, 5]).required(),
  frequency: Is.numeric().in([1, 2, 3, 4, 5]).required(),

  // Program Related
  programId: id.label('Program ID'),
  programTitle: title.label('Program Title'),
  cip: Is.string().required(),
  passScore: Is.numeric().integer().min(1).max(100).required(),

  // Standard Related
  standardId: id.label('Standard ID'),
  standardTitle: title.label('Standard Title').length(150),

  // Measurement Criteria Related
  measurementCriteriaId: id.label('Measurement Criteria ID'),
  measurementCriteriaTitle: title.label('Measurement Criteria Title').length(200),

  // Item & Item Option
  itemId: id.label('Item ID'),
  itemOptionId: id.label('Item Option ID')

})



let programFormSchema = schema.clone(['email', 'password'])




let errors = programFormSchema.validate({
  email: 'radrad.com',
  password: 'foo'
})

console.log(errors)



