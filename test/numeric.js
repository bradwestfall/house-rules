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


  /****************************************
    Integer
  *****************************************/

  it('should pass integer validation', () => {
    expect(validate({v: 10}, { v: Is.numeric().integer() })).to.be.empty
    expect(validate({v: -10}, { v: Is.numeric().integer() })).to.be.empty
    expect(validate({v: '10'}, { v: Is.numeric().integer() })).to.be.empty
    expect(validate({v: '-10'}, { v: Is.numeric().integer() })).to.be.empty
  })

  it('should fail integer validation', () => {
    expect(validate({v: 10.1}, { v: Is.numeric().integer() })).to.have.keys('v')
    expect(validate({v: '10.1'}, { v: Is.numeric().integer() })).to.have.keys('v')
    expect(validate({v: 'abc'}, { v: Is.numeric().integer() })).to.have.keys('v')
    expect(validate({v: false}, { v: Is.numeric().integer() })).to.have.keys('v')
    expect(validate({v: true}, { v: Is.numeric().integer() })).to.have.keys('v')
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


  /****************************************
    Positive
  *****************************************/

  it('should pass positive validation', () => {

    // Integers
    expect(validate({v: 1}, { v: Is.numeric().positive() })).to.be.empty
    expect(validate({v: '1'}, { v: Is.numeric().positive() })).to.be.empty

    // Floats
    expect(validate({v: 0.1}, { v: Is.numeric().positive() })).to.be.empty
    expect(validate({v: '0.1'}, { v: Is.numeric().positive() })).to.be.empty

  })

  it('should fail positive validation', () => {

    // Integers
    expect(validate({v: -1}, { v: Is.numeric().positive() })).to.have.keys('v')
    expect(validate({v: '-1'}, { v: Is.numeric().positive() })).to.have.keys('v')

    // Floats
    expect(validate({v: -0.1}, { v: Is.numeric().positive() })).to.have.keys('v')
    expect(validate({v: '-0.1'}, { v: Is.numeric().positive() })).to.have.keys('v')

  })


  /****************************************
    Negative
  *****************************************/

  it('should pass positive validation', () => {

    // Integers
    expect(validate({v: -1}, { v: Is.numeric().negative() })).to.be.empty
    expect(validate({v: '-1'}, { v: Is.numeric().negative() })).to.be.empty

    // Floats
    expect(validate({v: -0.1}, { v: Is.numeric().negative() })).to.be.empty
    expect(validate({v: '-0.1'}, { v: Is.numeric().negative() })).to.be.empty

  })

  it('should fail positive validation', () => {

    // Integers
    expect(validate({v: 1}, { v: Is.numeric().negative() })).to.have.keys('v')
    expect(validate({v: '1'}, { v: Is.numeric().negative() })).to.have.keys('v')

    // Floats
    expect(validate({v: 0.1}, { v: Is.numeric().negative() })).to.have.keys('v')
    expect(validate({v: '0.1'}, { v: Is.numeric().negative() })).to.have.keys('v')

  })

})
