import { expect } from 'chai'
import { Is, validate } from '../src'

describe('Any Rules', () => {

  /****************************************
    Required
  *****************************************/

  const notRequiredRule = Is.any()

  it('should pass non-required validation', () => {

    // These should pass because the rule does not say it's required
    expect(validate({}, { v: notRequiredRule })).to.be.empty
    expect(validate({v: ''}, { v: notRequiredRule })).to.be.empty
    expect(validate({v: null}, { v: notRequiredRule })).to.be.empty
    expect(validate({v: undefined}, { v: notRequiredRule })).to.be.empty
  })

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


  /****************************************
    Optional
  *****************************************/

  // it('should pass optional validation', () => {

  //   // These should pass because the optional method was used on a rule that
  //   // was previously required
  //   expect(validate({}, { v: Is.numeric().required().optional() })).to.be.empty
  //   expect(validate({v: ''}, { v: Is.numeric().required().optional() })).to.be.empty
  //   expect(validate({v: null}, { v: Is.numeric().required().optional() })).to.be.empty
  //   expect(validate({v: undefined}, { v: Is.numeric().required().optional() })).to.be.empty

  // })

})
