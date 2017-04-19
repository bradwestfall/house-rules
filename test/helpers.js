import { expect } from 'chai'
import { camelToLabel, isNumeric, isEmpty } from '../src/helpers'

describe('Helpers: camelToLabel', () => {
  it('should transform camelCase to "Label Case"', () => {
    expect(camelToLabel('fooBar')).to.eql('Foo Bar')
  })
})

describe('Helpers: isNumeric', () => {

  it('should pass', () => {
    expect(isNumeric('10')).to.be.true
    expect(isNumeric('10.0')).to.be.true
    expect(isNumeric('-10')).to.be.true
    expect(isNumeric('-10.0')).to.be.true
  })

  it('should fail', () => {
    expect(() => { isNumeric() }).to.throw
    expect(() => { isNumeric(false) }).to.throw
    expect(() => { isNumeric(true) }).to.throw
    expect(() => { isNumeric(1) }).to.throw
    expect(isNumeric('')).to.be.false
    expect(isNumeric('a')).to.be.false
  })

})

describe('Helpers: isEmpty', () => {

  it('should pass', () => {
    expect(isEmpty(null)).to.be.true
    expect(isEmpty(undefined)).to.be.true
    expect(isEmpty('')).to.be.true
    expect(isEmpty(' ')).to.be.true
  })

  it('should fail', () => {
    expect(isEmpty('a')).to.be.false
    expect(isEmpty(0)).to.be.false
  })

})
