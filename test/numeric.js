import { expect } from 'chai'
import { Is, validate } from '../src'

describe('Numeric Rules', () => {

  /****************************************
    Is Numeric
  *****************************************/

  const numericRule = Is.numeric()

  it('should pass numeric validation', () => {
    expect(validate({v: 1}, { v: numericRule })).to.be.empty
    expect(validate({v: '1'}, { v: numericRule })).to.be.empty
  })

  it('should fail numeric validation', () => {
    expect(validate({v: 'a'}, { v: numericRule })).to.have.keys('v')
    expect(validate({v: true}, { v: numericRule })).to.have.keys('v')
    expect(validate({v: false}, { v: numericRule })).to.have.keys('v')
    expect(validate({v: {}}, { v: numericRule })).to.have.keys('v')
    expect(validate({v: () => {}}, { v: numericRule })).to.have.keys('v')
  })

  it('should fail numeric validation with a custom message', () => {
    expect(validate({v: 'a'}, { v: Is.numeric('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Integer
  *****************************************/

  const integerRule = Is.numeric().integer()

  it('should pass integer validation', () => {
    expect(validate({v: 1}, { v: integerRule })).to.be.empty
    expect(validate({v: -1}, { v: integerRule })).to.be.empty
    expect(validate({v: '1'}, { v: integerRule })).to.be.empty
    expect(validate({v: '-1'}, { v: integerRule })).to.be.empty
  })

  it('should fail integer validation', () => {
    expect(validate({v: 1.1}, { v: integerRule })).to.have.keys('v')
    expect(validate({v: '1.1'}, { v: integerRule })).to.have.keys('v')
    expect(validate({v: 'abc'}, { v: integerRule })).to.have.keys('v')
    expect(validate({v: false}, { v: integerRule })).to.have.keys('v')
    expect(validate({v: true}, { v: integerRule })).to.have.keys('v')
  })

  it('should fail integer validation with a custom message', () => {
    expect(validate({v: 1.1}, { v: Is.numeric().integer('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Float
  *****************************************/

  const floatRule = Is.numeric().float(1)

  it('should pass float validation', () => {
    expect(validate({v: 1}, { v: floatRule })).to.be.empty
    expect(validate({v: 1.1}, { v: floatRule })).to.be.empty
    expect(validate({v: -1.1}, { v: floatRule })).to.be.empty
    expect(validate({v: '1'}, { v: floatRule })).to.be.empty
    expect(validate({v: '1.1'}, { v: floatRule })).to.be.empty
    expect(validate({v: '-1.1'}, { v: floatRule })).to.be.empty
  })

  it('should fail float validation', () => {
    expect(validate({v: 1.11}, { v: floatRule })).to.have.keys('v')
    expect(validate({v: '1. 1'}, { v: floatRule })).to.have.keys('v')
    expect(validate({v: 'abc'}, { v: floatRule })).to.have.keys('v')
    expect(validate({v: false}, { v: floatRule })).to.have.keys('v')
    expect(validate({v: true}, { v: floatRule })).to.have.keys('v')
  })

  it('should fail float validation with a custom message', () => {
    expect(validate({v: 1.11}, { v: Is.numeric().float(1, 'foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Min
  *****************************************/

  it('should pass min validation', () => {

    // Integers
    expect(validate({v: 10}, { v: Is.numeric().min(10) })).to.be.empty
    expect(validate({v: 0}, { v: Is.numeric().min(-1) })).to.be.empty
    expect(validate({v: 11}, { v: Is.numeric().min(10) })).to.be.empty
    expect(validate({v: '11'}, { v: Is.numeric().min(10) })).to.be.empty
    expect(validate({v: 11}, { v: Is.numeric().min('10') })).to.be.empty
    expect(validate({v: '11'}, { v: Is.numeric().min('10') })).to.be.empty

    // Floats
    expect(validate({v: 10.0}, { v: Is.numeric().min(10) })).to.be.empty
    expect(validate({v: 10.0}, { v: Is.numeric().min(10.0) })).to.be.empty
    expect(validate({v: 10.1}, { v: Is.numeric().min(10) })).to.be.empty
    expect(validate({v: 10.1}, { v: Is.numeric().min(10.0) })).to.be.empty
    expect(validate({v: '10.0'}, { v: Is.numeric().min('10') })).to.be.empty
    expect(validate({v: '10.0'}, { v: Is.numeric().min('10.0') })).to.be.empty
    expect(validate({v: '10.1'}, { v: Is.numeric().min('10') })).to.be.empty
    expect(validate({v: '10.1'}, { v: Is.numeric().min('10.0') })).to.be.empty

  })

  it('should fail min validation', () => {

    // Integers
    expect(validate({v: 9}, { v: Is.numeric().min(10) })).to.have.keys('v')
    expect(validate({v: '9'}, { v: Is.numeric().min(10) })).to.have.keys('v')
    expect(validate({v: 9}, { v: Is.numeric().min('10') })).to.have.keys('v')
    expect(validate({v: '9'}, { v: Is.numeric().min('10') })).to.have.keys('v')

    // Floats
    expect(validate({v: 9.9}, { v: Is.numeric().min(10) })).to.have.keys('v')
    expect(validate({v: 9.9}, { v: Is.numeric().min(10.0) })).to.have.keys('v')
    expect(validate({v: '9.9'}, { v: Is.numeric().min('10') })).to.have.keys('v')
    expect(validate({v: '9.9'}, { v: Is.numeric().min('10.0') })).to.have.keys('v')

  })

  it('should fail min validation with a custom message', () => {
    expect(validate({v: 9}, { v: Is.numeric().min(10, 'foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Max
  *****************************************/

  it('should pass max validation', () => {

    // Integers
    expect(validate({v: 10}, { v: Is.numeric().max(10) })).to.be.empty
    expect(validate({v: -1}, { v: Is.numeric().max(0) })).to.be.empty
    expect(validate({v: 9}, { v: Is.numeric().max(10) })).to.be.empty
    expect(validate({v: '9'}, { v: Is.numeric().max(10) })).to.be.empty
    expect(validate({v: 9}, { v: Is.numeric().max('10') })).to.be.empty
    expect(validate({v: '9'}, { v: Is.numeric().max('10') })).to.be.empty

    // Floats
    expect(validate({v: 10.0}, { v: Is.numeric().max(10.0) })).to.be.empty
    expect(validate({v: -1.0}, { v: Is.numeric().max(0) })).to.be.empty
    expect(validate({v: 10.0}, { v: Is.numeric().max(10.0) })).to.be.empty
    expect(validate({v: 9.9}, { v: Is.numeric().max(10) })).to.be.empty
    expect(validate({v: 9.9}, { v: Is.numeric().max(10.0) })).to.be.empty
    expect(validate({v: '10.0'}, { v: Is.numeric().max('10') })).to.be.empty
    expect(validate({v: '10.0'}, { v: Is.numeric().max('10.0') })).to.be.empty
    expect(validate({v: '9.9'}, { v: Is.numeric().max('10') })).to.be.empty
    expect(validate({v: '9.9'}, { v: Is.numeric().max('10.0') })).to.be.empty

  })

  it('should fail max validation', () => {

    // Integers
    expect(validate({v: 11}, { v: Is.numeric().max(10) })).to.have.keys('v')
    expect(validate({v: '11'}, { v: Is.numeric().max(10) })).to.have.keys('v')
    expect(validate({v: 11}, { v: Is.numeric().max('10') })).to.have.keys('v')
    expect(validate({v: '11'}, { v: Is.numeric().max('10') })).to.have.keys('v')

    // Floats
    expect(validate({v: 10.1}, { v: Is.numeric().max(10) })).to.have.keys('v')
    expect(validate({v: 10.1}, { v: Is.numeric().max(10.0) })).to.have.keys('v')
    expect(validate({v: '10.1'}, { v: Is.numeric().max('10') })).to.have.keys('v')
    expect(validate({v: '10.1'}, { v: Is.numeric().max('10.0') })).to.have.keys('v')

  })

  it('should fail max validation with a custom message', () => {
    expect(validate({v: 11}, { v: Is.numeric().max(10, 'foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Positive
  *****************************************/

  const positiveRule = Is.numeric().positive()

  it('should pass positive validation', () => {
    expect(validate({v: 1}, { v: positiveRule })).to.be.empty
    expect(validate({v: '1'}, { v: positiveRule })).to.be.empty
    expect(validate({v: 0.1}, { v: positiveRule })).to.be.empty
    expect(validate({v: '0.1'}, { v: positiveRule })).to.be.empty
  })

  it('should fail positive validation', () => {
    expect(validate({v: -1}, { v: positiveRule })).to.have.keys('v')
    expect(validate({v: '-1'}, { v: positiveRule })).to.have.keys('v')
    expect(validate({v: -0.1}, { v: positiveRule })).to.have.keys('v')
    expect(validate({v: '-0.1'}, { v: positiveRule })).to.have.keys('v')
  })

  it('should fail positive validation with a custom message', () => {
    expect(validate({v: -1}, { v: Is.numeric().positive('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Negative
  *****************************************/

  const negativeRule = Is.numeric().negative()

  it('should pass negative validation', () => {
    expect(validate({v: -1}, { v: negativeRule })).to.be.empty
    expect(validate({v: '-1'}, { v: negativeRule })).to.be.empty
    expect(validate({v: -0.1}, { v: negativeRule })).to.be.empty
    expect(validate({v: '-0.1'}, { v: negativeRule })).to.be.empty
  })

  it('should fail negative validation', () => {
    expect(validate({v: 1}, { v: negativeRule })).to.have.keys('v')
    expect(validate({v: '1'}, { v: negativeRule })).to.have.keys('v')
    expect(validate({v: 0.1}, { v: negativeRule })).to.have.keys('v')
    expect(validate({v: '0.1'}, { v: negativeRule })).to.have.keys('v')
  })

  it('should fail negative validation with a custom message', () => {
    expect(validate({v: 1}, { v: Is.numeric().negative('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })

})
