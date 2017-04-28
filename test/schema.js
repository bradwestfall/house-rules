import { expect } from 'chai'
import { Is, Schema } from '../src'

describe('Schema Validation', () => {

  /****************************************
    Basic Schema
  *****************************************/

  const basicSchema = new Schema({
    email: Is.string().email().required(),
    password: Is.string().minLength(6).required()
  })

  it('should pass schema validation', () => {
    const values = { email: 'a@a.com', password: '123456'}
    expect(basicSchema.validate(values)).to.be.empty
  })

  it('should fail schema validation', () => {
    const values = { email: 'a@a' }
    expect(basicSchema.validate(values)).to.have.keys('email', 'password')
  })

  const clonedSchema = basicSchema.clone(['email'])

  it('should pass schema validation', () => {
    const values = { email: 'a@a.com' }
    expect(clonedSchema.validate(values)).to.be.empty
  })

  it('should fail schema validation', () => {
    const values = { email: 'a@a' }
    expect(clonedSchema.validate(values)).to.have.keys('email')
  })


  /****************************************
    Custom Error Formatting
  *****************************************/

  const customErrorSchema = new Schema({
    email: Is.string().email()
  }).onError(errors => {
    return { email: 'foo' }
  })

  it('should have a custom error message', () => {
    const values = { email: 'a@a' }
    expect(customErrorSchema.validate(values)).to.have.deep.property('email', 'foo')
  })

})
