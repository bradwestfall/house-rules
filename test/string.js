import { expect } from 'chai'
import { Is, validate } from '../src'

describe('String Rules', () => {

  /****************************************
    Is String
  *****************************************/

  const stringRule = Is.string()

  it('should pass string validation', () => {
    expect(validate({v: 'a'}, { v: stringRule })).to.be.empty
    expect(validate({v: '1'}, { v: stringRule })).to.be.empty
  })

  it('should fail string validation', () => {
    expect(validate({v: 1}, { v: stringRule })).to.have.keys('v')
    expect(validate({v: true}, { v: stringRule })).to.have.keys('v')
    expect(validate({v: false}, { v: stringRule })).to.have.keys('v')
    expect(validate({v: {}}, { v: stringRule })).to.have.keys('v')
    expect(validate({v: () => {}}, { v: stringRule })).to.have.keys('v')
  })

  it('should fail string validation with a custom message', () => {
    expect(validate({v: 1}, { v: Is.string('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Length
  *****************************************/

  const lengthRule = Is.string().length(2)

  it('should pass length validation', () => {
    expect(validate({v: 'aa'}, { v: lengthRule })).to.be.empty
  })

  it('should fail length validation', () => {
    expect(validate({v: 'a'}, { v: lengthRule })).to.have.keys('v')
    expect(validate({v: 'aaa'}, { v: lengthRule })).to.have.keys('v')
  })

  it('should fail length validation with a custom message', () => {
    expect(validate({v: 'a'}, { v: Is.string().length(2, 'foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Max Length
  *****************************************/

  const maxLengthRule = Is.string().maxLength(2)

  it('should pass maxLength validation', () => {
    expect(validate({v: ''}, { v: maxLengthRule })).to.be.empty
    expect(validate({v: 'a'}, { v: maxLengthRule })).to.be.empty
    expect(validate({v: 'aa'}, { v: maxLengthRule })).to.be.empty
  })

  it('should fail maxLength validation', () => {
    expect(validate({v: 'aaa'}, { v: maxLengthRule })).to.have.keys('v')
  })

  it('should fail maxLength validation with a custom message', () => {
    expect(validate({v: 'aaa'}, { v: Is.string().maxLength(2, 'foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Min Length
  *****************************************/

  const minLengthRule = Is.string().minLength(2)

  it('should pass minLength validation', () => {
    expect(validate({v: 'aa'}, { v: minLengthRule })).to.be.empty
  })

  it('should fail minLength validation', () => {
    expect(validate({v: 'a'}, { v: minLengthRule })).to.have.keys('v')
  })

  it('should fail minLength validation with a custom message', () => {
    expect(validate({v: 'a'}, { v: Is.string().minLength(2, 'foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    RegEx Rule
  *****************************************/

  const regexRule = Is.string().regex(/^[\d]{3}$/)

  it('should pass regex validation', () => {
    expect(validate({v: '111'}, { v: regexRule })).to.be.empty
  })

  it('should fail regex validation', () => {
    expect(validate({v: '1'}, { v: regexRule })).to.have.keys('v')
  })

  it('should fail regex validation with a custom message', () => {
    expect(validate({v: 'a'}, { v: Is.string().regex(/^[\d]{3}$/, 'foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Email Rule
  *****************************************/

  const emailRule = Is.string().email()

  it('should pass email validation', () => {
    expect(validate({v: 'a@a.com'}, { v: emailRule })).to.be.empty
  })

  it('should fail email validation', () => {
    expect(validate({v: 'a@a'}, { v: emailRule })).to.have.keys('v')
  })

  it('should fail email validation with a custom message', () => {
    expect(validate({v: 'a@a'}, { v: Is.string().email('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Ascii Rule
  *****************************************/

  const asciiRule = Is.string().ascii()

  it('should pass ascii validation', () => {
    expect(validate({v: 'abc XYZ 123'}, { v: asciiRule })).to.be.empty
  })

  it('should fail ascii validation', () => {
    expect(validate({v: '©'}, { v: asciiRule })).to.have.keys('v')
  })

  it('should fail ascii validation with a custom message', () => {
    expect(validate({v: '©'}, { v: Is.string().ascii('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Alpha Rule
  *****************************************/

  const alphaRule = Is.string().alpha()
  const alphaRuleNonStrict = Is.string().alpha(false)

  it('should pass alpha validation', () => {
    expect(validate({v: 'abcXYZ'}, { v: alphaRule })).to.be.empty
    expect(validate({v: 'abc\n XYZ'}, { v: alphaRuleNonStrict })).to.be.empty
  })

  it('should fail alpha validation', () => {
    expect(validate({v: 'a a'}, { v: alphaRule })).to.have.keys('v')
    expect(validate({v: '123'}, { v: alphaRule })).to.have.keys('v')
  })

  it('should fail alpha validation with a custom message', () => {
    expect(validate({v: 'a a'}, { v: Is.string().alpha(true, 'foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Alpha/Numeric Rule
  *****************************************/

  const alphaNumRule = Is.string().alphaNum()
  const alphaNumRuleNonStrict = Is.string().alphaNum(false)

  it('should pass alphaNum validation', () => {
    expect(validate({v: 'abcXYZ123'}, { v: alphaNumRule })).to.be.empty
    expect(validate({v: 'abc\n XYZ123'}, { v: alphaNumRuleNonStrict })).to.be.empty
  })

  it('should fail alphaNum validation', () => {
    expect(validate({v: 'a 1'}, { v: alphaNumRule })).to.have.keys('v')
    expect(validate({v: '!'}, { v: alphaNumRule })).to.have.keys('v')
  })

  it('should fail alphaNum validation with a custom message', () => {
    expect(validate({v: 'a 1'}, { v: Is.string().alphaNum(true, 'foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Lowercase
  *****************************************/

  const lowercaseRule = Is.string().lowercase()

  it('should pass lowercase validation', () => {
    expect(validate({v: 'abc'}, { v: lowercaseRule })).to.be.empty
  })

  it('should fail lowercase validation', () => {
    expect(validate({v: 'ABC'}, { v: lowercaseRule })).to.have.keys('v')
  })

  it('should fail lowercase validation with a custom message', () => {
    expect(validate({v: 'ABC'}, { v: Is.string().lowercase('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Uppercase
  *****************************************/

  const uppercaseRule = Is.string().uppercase()

  it('should pass uppercase validation', () => {
    expect(validate({v: 'ABC'}, { v: uppercaseRule })).to.be.empty
  })

  it('should fail uppercase validation', () => {
    expect(validate({v: 'abc'}, { v: uppercaseRule })).to.have.keys('v')
  })

  it('should fail uppercase validation with a custom message', () => {
    expect(validate({v: 'abc'}, { v: Is.string().uppercase('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })

})
