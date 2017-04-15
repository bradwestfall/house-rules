import { expect } from 'chai'
import { Is, validate } from '../src'

describe('String Rules', () => {

  /****************************************
    Is String
  *****************************************/

  const stringRule = Is.string()

  it('should pass string validation', () => {
    expect(validate({s: 'a'}, { s: stringRule })).to.be.empty
    expect(validate({s: '1'}, { s: stringRule })).to.be.empty
  })

  it('should fail string validation', () => {
    expect(validate({s: 1}, { s: stringRule })).to.have.keys('s')
    expect(validate({s: true}, { s: stringRule })).to.have.keys('s')
    expect(validate({s: false}, { s: stringRule })).to.have.keys('s')
    expect(validate({s: {}}, { s: stringRule })).to.have.keys('s')
    expect(validate({s: () => {}}, { s: stringRule })).to.have.keys('s')
  })


  /****************************************
    Max Length
  *****************************************/

  const maxLengthRule = Is.string().maxLength(2)

  it('should pass maxLength validation', () => {
    expect(validate({s: ''}, { s: maxLengthRule })).to.be.empty
    expect(validate({s: 'a'}, { s: maxLengthRule })).to.be.empty
    expect(validate({s: 'aa'}, { s: maxLengthRule })).to.be.empty
  })

  it('should fail maxLength validation', () => {
    expect(validate({s: 'aaa'}, { s: maxLengthRule })).to.have.keys('s')
  })


  /****************************************
    Min Length
  *****************************************/

  const minLengthRule = Is.string().minLength(2)

  it('should pass minLength validation', () => {
    expect(validate({s: 'aa'}, { s: minLengthRule })).to.be.empty
  })

  it('should fail minLength validation', () => {
    expect(validate({s: 'a'}, { s: minLengthRule })).to.have.keys('s')
  })


  /****************************************
    RegEx Rule
  *****************************************/

  const regexRule = Is.string().regex(/^[\d]{3}$/)

  it('should pass regex validation', () => {
    expect(validate({s: '111'}, { s: regexRule })).to.be.empty
  })

  it('should fail regex validation', () => {
    expect(validate({s: '1'}, { s: regexRule })).to.have.keys('s')
  })


  /****************************************
    Email Rule
  *****************************************/

  const emailRule = Is.string().email()

  it('should pass email validation', () => {
    expect(validate({s: 'a@a.com'}, { s: emailRule })).to.be.empty
  })

  it('should fail email validation', () => {
    expect(validate({s: 'a@a'}, { s: emailRule })).to.have.keys('s')
  })


  /****************************************
    Ascii Rule
  *****************************************/

  const asciiRule = Is.string().ascii()

  it('should pass ascii validation', () => {
    expect(validate({s: 'abc XYZ 123'}, { s: asciiRule })).to.be.empty
  })

  it('should fail ascii validation', () => {
    expect(validate({s: '©'}, { s: asciiRule })).to.have.keys('s')
  })


  /****************************************
    Alpha Rule
  *****************************************/

  const alphaRule = Is.string().alpha()
  const alphaRuleLoose = Is.string().alpha(false)

  it('should pass alpha validation', () => {
    expect(validate({s: 'abcXYZ'}, { s: alphaRule })).to.be.empty
    expect(validate({s: 'abc\n XYZ'}, { s: alphaRuleLoose })).to.be.empty
  })

  it('should fail alpha validation', () => {
    expect(validate({s: 'a a'}, { s: alphaRule })).to.have.keys('s')
    expect(validate({s: '123'}, { s: alphaRule })).to.have.keys('s')
  })


  /****************************************
    Alpha/Numeric Rule
  *****************************************/

  const alphaNumRule = Is.string().alphaNum()
  const alphaNumRuleLoose = Is.string().alphaNum(false)

  it('should pass alphaNum validation', () => {
    expect(validate({s: 'abcXYZ123'}, { s: alphaNumRule })).to.be.empty
    expect(validate({s: 'abc\n XYZ123'}, { s: alphaNumRuleLoose })).to.be.empty
  })

  it('should fail alphaNum validation', () => {
    expect(validate({s: 'a 1'}, { s: alphaNumRule })).to.have.keys('s')
    expect(validate({s: '!'}, { s: alphaNumRule })).to.have.keys('s')
  })


})
