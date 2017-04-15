import { expect } from 'chai'
import { Is, validate } from '../src'

describe('String Rules', () => {

  /****************************************
    Max Length
  *****************************************/

  it('should pass maxLength validation', () => {
    expect(validate({s: ''}, { s: Is.string().maxLength(2) })).to.be.empty
    expect(validate({s: 'a'}, { s: Is.string().maxLength(2) })).to.be.empty
    expect(validate({s: 'aa'}, { s: Is.string().maxLength(2) })).to.be.empty
  })

  it('should fail maxLength validation', () => {
    expect(validate({s: 'aaa'}, { s: Is.string().maxLength(2) })).to.have.keys('s')
  })

})
