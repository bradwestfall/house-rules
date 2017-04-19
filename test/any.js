import { expect } from 'chai'
import { Is, validate } from '../src'

describe('Any Rules', () => {

  /****************************************
    Is Any
  *****************************************/

  const anyRule = Is.any()

  it('should pass any validation', () => {

    // These should pass because the rule does not say it's required
    expect(validate({}, { v: anyRule })).to.be.empty
    expect(validate({v: ''}, { v: anyRule })).to.be.empty
    expect(validate({v: null}, { v: anyRule })).to.be.empty
    expect(validate({v: undefined}, { v: anyRule })).to.be.empty
  })


  /****************************************
    Removing Rules
  *****************************************/

  it('should have no errors after removing a required rule', () => {
    expect(validate({v: ''}, { v: Is.any().required().removeRule('required') })).to.be.empty
  })


  /****************************************
    Overriding Message
  *****************************************/

  it('should have a custom message', () => {
    expect(validate({v: ''}, { v: Is.any().required().message('Foo') })).to.have.deep.property('v.errors[0]', 'Foo')
  })


  /****************************************
    Custom Label
  *****************************************/

  const customRule = Is.any().custom(value => {
    return value === 'foo' ? '' : 'Not Valid'
  })

  it('should pass custom validation', () => {
    expect(validate({v: 'foo'}, { v: customRule })).to.be.empty
  })

  it('should fail custom validation', () => {
    expect(validate({v: 'bar'}, { v: customRule })).to.have.keys('v')
  })


  /****************************************
    Required
  *****************************************/

  const requiredRule = Is.any().required()

  it('should pass required validation', () => {
    expect(validate({v: 'a'}, { v: requiredRule })).to.be.empty
    expect(validate({v: 0}, { v: requiredRule })).to.be.empty
  })

  it('should fail required validation', () => {
    expect(validate({}, { v: requiredRule })).to.have.keys('v')
    expect(validate({v: ''}, { v: requiredRule })).to.have.keys('v')
    expect(validate({v: null}, { v: requiredRule })).to.have.keys('v')
    expect(validate({v: undefined}, { v: requiredRule })).to.have.keys('v')
    expect(validate({v: {}}, { v: requiredRule })).to.have.keys('v')
  })

  it('should fail required validation with a custom message', () => {
    expect(validate({}, { v: Is.any().required('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Optional
  *****************************************/

  const optionalRule = Is.any().required().optional()

  it('should pass optional validation', () => {

    // These should pass because the optional method was used on a rule that
    // was previously required
    expect(validate({}, { v: optionalRule })).to.be.empty
    expect(validate({v: ''}, { v: optionalRule })).to.be.empty
    expect(validate({v: null}, { v: optionalRule })).to.be.empty
    expect(validate({v: undefined}, { v: optionalRule })).to.be.empty

  })


  /****************************************
    In
  *****************************************/

  it('should pass "in" validation', () => {
    expect(validate({v: 'aaa'}, { v: Is.any().in(['x', 'aaa']) })).to.be.empty
    expect(validate({v: '123'}, { v: Is.any().in(['x', '123']) })).to.be.empty
    expect(validate({v: '123'}, { v: Is.any().in(['x', 123]) })).to.be.empty
    expect(validate({v: 123}, { v: Is.any().in(['x', '123']) })).to.be.empty
    expect(validate({v: 123}, { v: Is.any().in(['x', 123]) })).to.be.empty
    expect(validate({v: null}, { v: Is.any().in(['x', null]) })).to.be.empty
    expect(validate({v: undefined}, { v: Is.any().in(['x', undefined]) })).to.be.empty
  })

  it('should fail "in" validation', () => {
    expect(validate({v: 'aaa'}, { v: Is.any().in(['x']) })).to.have.keys('v')
  })

  it('should fail "in" validation with a custom message', () => {
    expect(validate({v: 'aaa'}, { v: Is.any().in(['x'], 'foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })

})
