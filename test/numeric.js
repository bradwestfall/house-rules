import { expect } from 'chai'
import { Is, validate } from '../src'

describe('Numeric Rules', () => {

  /****************************************
    Required
  *****************************************/

  it('should pass required validation', () => {

    // These should pass because the rule does not say it's required
    expect(validate({}, { n: Is.numeric() })).to.be.empty
    expect(validate({n: ''}, { n: Is.numeric() })).to.be.empty
    expect(validate({n: null}, { n: Is.numeric() })).to.be.empty
    expect(validate({n: undefined}, { n: Is.numeric() })).to.be.empty

  })

  it('should fail required validation', () => {
    expect(validate({}, { n: Is.numeric().required() })).to.have.keys('n')
    expect(validate({n: ''}, { n: Is.numeric().required() })).to.have.keys('n')
    expect(validate({n: null}, { n: Is.numeric().required() })).to.have.keys('n')
    expect(validate({n: undefined}, { n: Is.numeric().required() })).to.have.keys('n')
  })


  /****************************************
    Optional
  *****************************************/

  it('should pass optional validation', () => {

    // These should pass because the optional method was used on a rule that
    // was previously required
    expect(validate({}, { n: Is.numeric().required().optional() })).to.be.empty
    expect(validate({n: ''}, { n: Is.numeric().required().optional() })).to.be.empty
    expect(validate({n: null}, { n: Is.numeric().required().optional() })).to.be.empty
    expect(validate({n: undefined}, { n: Is.numeric().required().optional() })).to.be.empty

  })


  /****************************************
    Integer
  *****************************************/

  it('should pass integer validation', () => {
    expect(validate({n: 10}, { n: Is.numeric().integer() })).to.be.empty
    expect(validate({n: -10}, { n: Is.numeric().integer() })).to.be.empty
    expect(validate({n: '10'}, { n: Is.numeric().integer() })).to.be.empty
    expect(validate({n: '-10'}, { n: Is.numeric().integer() })).to.be.empty
  })

  it('should fail integer validation', () => {
    expect(validate({n: 10.1}, { n: Is.numeric().integer() })).to.have.keys('n')
    expect(validate({n: '10.1'}, { n: Is.numeric().integer() })).to.have.keys('n')
    expect(validate({n: 'abc'}, { n: Is.numeric().integer() })).to.have.keys('n')
    expect(validate({n: false}, { n: Is.numeric().integer() })).to.have.keys('n')
    expect(validate({n: true}, { n: Is.numeric().integer() })).to.have.keys('n')
  })


  /****************************************
    Min
  *****************************************/

  it('should pass min validation', () => {

    // Integers
    expect(validate({n: 10}, { n: Is.numeric().min(10) })).to.be.empty
    expect(validate({n: 0}, { n: Is.numeric().min(-1) })).to.be.empty
    expect(validate({n: 11}, { n: Is.numeric().min(10) })).to.be.empty
    expect(validate({n: '11'}, { n: Is.numeric().min(10) })).to.be.empty
    expect(validate({n: 11}, { n: Is.numeric().min('10') })).to.be.empty
    expect(validate({n: '11'}, { n: Is.numeric().min('10') })).to.be.empty

    // Floats
    expect(validate({n: 10.0}, { n: Is.numeric().min(10) })).to.be.empty
    expect(validate({n: 10.0}, { n: Is.numeric().min(10.0) })).to.be.empty
    expect(validate({n: 10.1}, { n: Is.numeric().min(10) })).to.be.empty
    expect(validate({n: 10.1}, { n: Is.numeric().min(10.0) })).to.be.empty
    expect(validate({n: '10.0'}, { n: Is.numeric().min('10') })).to.be.empty
    expect(validate({n: '10.0'}, { n: Is.numeric().min('10.0') })).to.be.empty
    expect(validate({n: '10.1'}, { n: Is.numeric().min('10') })).to.be.empty
    expect(validate({n: '10.1'}, { n: Is.numeric().min('10.0') })).to.be.empty

  })

  it('should fail min validation', () => {

    // Integers
    expect(validate({n: 9}, { n: Is.numeric().min(10) })).to.have.keys('n')
    expect(validate({n: '9'}, { n: Is.numeric().min(10) })).to.have.keys('n')
    expect(validate({n: 9}, { n: Is.numeric().min('10') })).to.have.keys('n')
    expect(validate({n: '9'}, { n: Is.numeric().min('10') })).to.have.keys('n')

    // Floats
    expect(validate({n: 9.9}, { n: Is.numeric().min(10) })).to.have.keys('n')
    expect(validate({n: 9.9}, { n: Is.numeric().min(10.0) })).to.have.keys('n')
    expect(validate({n: '9.9'}, { n: Is.numeric().min('10') })).to.have.keys('n')
    expect(validate({n: '9.9'}, { n: Is.numeric().min('10.0') })).to.have.keys('n')

  })


  /****************************************
    Max
  *****************************************/

  it('should pass max validation', () => {

    // Integers
    expect(validate({n: 10}, { n: Is.numeric().max(10) })).to.be.empty
    expect(validate({n: -1}, { n: Is.numeric().max(0) })).to.be.empty
    expect(validate({n: 9}, { n: Is.numeric().max(10) })).to.be.empty
    expect(validate({n: '9'}, { n: Is.numeric().max(10) })).to.be.empty
    expect(validate({n: 9}, { n: Is.numeric().max('10') })).to.be.empty
    expect(validate({n: '9'}, { n: Is.numeric().max('10') })).to.be.empty

    // Floats
    expect(validate({n: 10.0}, { n: Is.numeric().max(10.0) })).to.be.empty
    expect(validate({n: -1.0}, { n: Is.numeric().max(0) })).to.be.empty
    expect(validate({n: 10.0}, { n: Is.numeric().max(10.0) })).to.be.empty
    expect(validate({n: 9.9}, { n: Is.numeric().max(10) })).to.be.empty
    expect(validate({n: 9.9}, { n: Is.numeric().max(10.0) })).to.be.empty
    expect(validate({n: '10.0'}, { n: Is.numeric().max('10') })).to.be.empty
    expect(validate({n: '10.0'}, { n: Is.numeric().max('10.0') })).to.be.empty
    expect(validate({n: '9.9'}, { n: Is.numeric().max('10') })).to.be.empty
    expect(validate({n: '9.9'}, { n: Is.numeric().max('10.0') })).to.be.empty

  })

  it('should fail max validation', () => {

    // Integers
    expect(validate({n: 11}, { n: Is.numeric().max(10) })).to.have.keys('n')
    expect(validate({n: '11'}, { n: Is.numeric().max(10) })).to.have.keys('n')
    expect(validate({n: 11}, { n: Is.numeric().max('10') })).to.have.keys('n')
    expect(validate({n: '11'}, { n: Is.numeric().max('10') })).to.have.keys('n')

    // Floats
    expect(validate({n: 10.1}, { n: Is.numeric().max(10) })).to.have.keys('n')
    expect(validate({n: 10.1}, { n: Is.numeric().max(10.0) })).to.have.keys('n')
    expect(validate({n: '10.1'}, { n: Is.numeric().max('10') })).to.have.keys('n')
    expect(validate({n: '10.1'}, { n: Is.numeric().max('10.0') })).to.have.keys('n')

  })


  /****************************************
    Positive
  *****************************************/

  it('should pass positive validation', () => {

    // Integers
    expect(validate({n: 1}, { n: Is.numeric().positive() })).to.be.empty
    expect(validate({n: '1'}, { n: Is.numeric().positive() })).to.be.empty

    // Floats
    expect(validate({n: 0.1}, { n: Is.numeric().positive() })).to.be.empty
    expect(validate({n: '0.1'}, { n: Is.numeric().positive() })).to.be.empty

  })

  it('should fail positive validation', () => {

    // Integers
    expect(validate({n: -1}, { n: Is.numeric().positive() })).to.have.keys('n')
    expect(validate({n: '-1'}, { n: Is.numeric().positive() })).to.have.keys('n')

    // Floats
    expect(validate({n: -0.1}, { n: Is.numeric().positive() })).to.have.keys('n')
    expect(validate({n: '-0.1'}, { n: Is.numeric().positive() })).to.have.keys('n')

  })


  /****************************************
    Negative
  *****************************************/

  it('should pass positive validation', () => {

    // Integers
    expect(validate({n: -1}, { n: Is.numeric().negative() })).to.be.empty
    expect(validate({n: '-1'}, { n: Is.numeric().negative() })).to.be.empty

    // Floats
    expect(validate({n: -0.1}, { n: Is.numeric().negative() })).to.be.empty
    expect(validate({n: '-0.1'}, { n: Is.numeric().negative() })).to.be.empty

  })

  it('should fail positive validation', () => {

    // Integers
    expect(validate({n: 1}, { n: Is.numeric().negative() })).to.have.keys('n')
    expect(validate({n: '1'}, { n: Is.numeric().negative() })).to.have.keys('n')

    // Floats
    expect(validate({n: 0.1}, { n: Is.numeric().negative() })).to.have.keys('n')
    expect(validate({n: '0.1'}, { n: Is.numeric().negative() })).to.have.keys('n')

  })

})
