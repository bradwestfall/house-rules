import { expect } from 'chai'
import { Is, validate } from '../src'
import moment from 'moment'

// For reference
const today = moment(new Date()).format('MM-DD-YYYY')
const tomorrow = moment(new Date()).add(1, 'd').format('MM-DD-YYYY')
const yesterday = moment(new Date()).subtract(1, 'd').format('MM-DD-YYYY')

describe('Date Rules', () => {

  /****************************************
    Is Date
  *****************************************/

  const dateRule = Is.date('MM-DD-YYYY')

  it('should pass date validation', () => {
    expect(validate({v: '01-01-2000'}, { v: dateRule })).to.be.empty
    expect(validate({v: new Date()}, { v: dateRule })).to.be.empty
  })

  it('should fail date validation', () => {
    expect(validate({v: '2000-01-01'}, { v: dateRule })).to.have.keys('v')
    expect(validate({v: '01/01/2000'}, { v: dateRule })).to.have.keys('v')
  })

  it('should fail date validation with a custom message', () => {
    expect(validate({v: '2000-01-01'}, { v: Is.date('MM-DD-YYYY', 'foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Is Same
  *****************************************/

  const isSameRule = Is.date('MM-DD-YYYY').isSame('2000-01-01')

  it('should pass isSame validation', () => {
    expect(validate({v: '01-01-2000'}, { v: isSameRule })).to.be.empty
  })

  it('should fail isSame validation', () => {
    expect(validate({v: '01-02-2000'}, { v: isSameRule })).to.have.keys('v')
  })

  it('should fail isSame validation with a custom message', () => {
    expect(validate({v: '01-02-2000'}, { v: Is.date('MM-DD-YYYY').isSame('2000-01-01', 'foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Is Same Or Before
  *****************************************/

  const isSameOrBeforeRule = Is.date('MM-DD-YYYY').isSameOrBefore('2000-01-01')

  it('should pass isSameOrBefore validation', () => {
    expect(validate({v: '01-01-2000'}, { v: isSameOrBeforeRule })).to.be.empty
    expect(validate({v: '12-30-1999'}, { v: isSameOrBeforeRule })).to.be.empty
  })

  it('should fail isSameOrBefore validation', () => {
    expect(validate({v: '01-02-2000'}, { v: isSameOrBeforeRule })).to.have.keys('v')
  })

  it('should fail isSameOrBefore validation with a custom message', () => {
    expect(validate({v: '01-02-2000'}, { v: Is.date('MM-DD-YYYY').isSameOrBefore('2000-01-01', 'foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Is Same Or Before
  *****************************************/

  const isSameOrAfterRule = Is.date('MM-DD-YYYY').isSameOrAfter('2000-01-01')

  it('should pass isSameOrAfter validation', () => {
    expect(validate({v: '01-01-2000'}, { v: isSameOrAfterRule })).to.be.empty
    expect(validate({v: '01-02-2000'}, { v: isSameOrAfterRule })).to.be.empty
  })

  it('should fail isSameOrAfter validation', () => {
    expect(validate({v: '12-30-1999'}, { v: isSameOrAfterRule })).to.have.keys('v')
  })

  it('should fail isSameOrAfter validation with a custom message', () => {
    expect(validate({v: '12-30-1999'}, { v: Is.date('MM-DD-YYYY').isSameOrAfter('2000-01-01', 'foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Is Before
  *****************************************/

  const isBeforeRule = Is.date('MM-DD-YYYY').isBefore('2000-01-01')

  it('should pass isBefore validation', () => {
    expect(validate({v: '12-30-1999'}, { v: isBeforeRule })).to.be.empty
  })

  it('should fail isBefore validation', () => {
    expect(validate({v: '01-01-2000'}, { v: isBeforeRule })).to.have.keys('v')
    expect(validate({v: '01-02-2000'}, { v: isBeforeRule })).to.have.keys('v')
  })

  it('should fail isBefore validation with a custom message', () => {
    expect(validate({v: '01-01-2000'}, { v: Is.date('MM-DD-YYYY').isBefore('2000-01-01', 'foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Is Before Today
  *****************************************/

  const isBeforeTodayRule = Is.date('MM-DD-YYYY').isBeforeToday()

  it('should pass isBeforeToday validation', () => {
    expect(validate({v: yesterday}, { v: isBeforeTodayRule })).to.be.empty
  })

  it('should fail isBeforeToday validation', () => {
    expect(validate({v: today}, { v: isBeforeTodayRule })).to.have.keys('v')
    expect(validate({v: tomorrow}, { v: isBeforeTodayRule })).to.have.keys('v')
  })

  it('should fail isBeforeToday validation with a custom message', () => {
    expect(validate({v: today}, { v: Is.date('MM-DD-YYYY').isBeforeToday('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })

  /****************************************
    Is After
  *****************************************/

  const isAfterRule = Is.date('MM-DD-YYYY').isAfter('2000-01-01')

  it('should pass isAfter validation', () => {
    expect(validate({v: '01-02-2000'}, { v: isAfterRule })).to.be.empty
  })

  it('should fail isAfter validation', () => {
    expect(validate({v: '01-01-2000'}, { v: isAfterRule })).to.have.keys('v')
    expect(validate({v: '12-30-1999'}, { v: isAfterRule })).to.have.keys('v')
  })

  it('should fail isAfter validation with a custom message', () => {
    expect(validate({v: '01-01-2000'}, { v: Is.date('MM-DD-YYYY').isAfter('2000-01-01', 'foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Is After Today
  *****************************************/

  const isAfterTodayRule = Is.date('MM-DD-YYYY').isAfterToday()

  it('should pass isAfterToday validation', () => {
    expect(validate({v: tomorrow}, { v: isAfterTodayRule })).to.be.empty
  })

  it('should fail isAfterToday validation', () => {
    expect(validate({v: today}, { v: isAfterTodayRule })).to.have.keys('v')
    expect(validate({v: yesterday}, { v: isAfterTodayRule })).to.have.keys('v')
  })

  it('should fail isAfterToday validation with a custom message', () => {
    expect(validate({v: today}, { v: Is.date('MM-DD-YYYY').isAfterToday('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Is Monday
  *****************************************/

  const isMondayRule = Is.date('MM-DD-YYYY').isMonday()

  it('should pass isMonday validation', () => {
    expect(validate({v: '08-21-2017'}, { v: isMondayRule })).to.be.empty
  })

  it('should fail isMonday validation', () => {
    expect(validate({v: '08-22-2017'}, { v: isMondayRule })).to.have.keys('v')
  })

  it('should fail isMonday validation with a custom message', () => {
    expect(validate({v: '08-22-2017'}, { v: Is.date('MM-DD-YYYY').isMonday('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Is Tuesday
  *****************************************/

  const isTuesdayRule = Is.date('MM-DD-YYYY').isTuesday()

  it('should pass isTuesday validation', () => {
    expect(validate({v: '08-22-2017'}, { v: isTuesdayRule })).to.be.empty
  })

  it('should fail isTuesday validation', () => {
    expect(validate({v: '08-23-2017'}, { v: isTuesdayRule })).to.have.keys('v')
  })

  it('should fail isTuesday validation with a custom message', () => {
    expect(validate({v: '08-23-2017'}, { v: Is.date('MM-DD-YYYY').isTuesday('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Is Wednesday
  *****************************************/

  const isWednesdayRule = Is.date('MM-DD-YYYY').isWednesday()

  it('should pass isWednesday validation', () => {
    expect(validate({v: '08-23-2017'}, { v: isWednesdayRule })).to.be.empty
  })

  it('should fail isWednesday validation', () => {
    expect(validate({v: '08-24-2017'}, { v: isWednesdayRule })).to.have.keys('v')
  })

  it('should fail isWednesday validation with a custom message', () => {
    expect(validate({v: '08-24-2017'}, { v: Is.date('MM-DD-YYYY').isWednesday('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Is Thursday
  *****************************************/

  const isThursdayRule = Is.date('MM-DD-YYYY').isThursday()

  it('should pass isThursday validation', () => {
    expect(validate({v: '08-24-2017'}, { v: isThursdayRule })).to.be.empty
  })

  it('should fail isThursday validation', () => {
    expect(validate({v: '08-25-2017'}, { v: isThursdayRule })).to.have.keys('v')
  })

  it('should fail isThursday validation with a custom message', () => {
    expect(validate({v: '08-25-2017'}, { v: Is.date('MM-DD-YYYY').isThursday('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Is Friday
  *****************************************/

  const isFridayRule = Is.date('MM-DD-YYYY').isFriday()

  it('should pass isFriday validation', () => {
    expect(validate({v: '08-25-2017'}, { v: isFridayRule })).to.be.empty
  })

  it('should fail isFriday validation', () => {
    expect(validate({v: '08-26-2017'}, { v: isFridayRule })).to.have.keys('v')
  })

  it('should fail isFriday validation with a custom message', () => {
    expect(validate({v: '08-26-2017'}, { v: Is.date('MM-DD-YYYY').isFriday('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Is Saturday
  *****************************************/

  const isSaturdayRule = Is.date('MM-DD-YYYY').isSaturday()

  it('should pass isSaturday validation', () => {
    expect(validate({v: '08-26-2017'}, { v: isSaturdayRule })).to.be.empty
  })

  it('should fail isSaturday validation', () => {
    expect(validate({v: '08-27-2017'}, { v: isSaturdayRule })).to.have.keys('v')
  })

  it('should fail isSaturday validation with a custom message', () => {
    expect(validate({v: '08-27-2017'}, { v: Is.date('MM-DD-YYYY').isSaturday('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })


  /****************************************
    Is Sunday
  *****************************************/

  const isSundayRule = Is.date('MM-DD-YYYY').isSunday()

  it('should pass isSunday validation', () => {
    expect(validate({v: '08-27-2017'}, { v: isSundayRule })).to.be.empty
  })

  it('should fail isSunday validation', () => {
    expect(validate({v: '08-28-2017'}, { v: isSundayRule })).to.have.keys('v')
  })

  it('should fail isSunday validation with a custom message', () => {
    expect(validate({v: '08-28-2017'}, { v: Is.date('MM-DD-YYYY').isSunday('foo') })).to.have.deep.property('v.errors[0]', 'foo')
  })

})
