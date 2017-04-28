import _ from 'lodash'
import validator from 'validator'

// http://stackoverflow.com/a/5344074
const clone = obj => JSON.parse(JSON.stringify(obj))

const camelToLabel = camelCase =>  {
  return camelCase.replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
}

const isNumeric = number => {
  if (typeof number !== 'string') throw new Error('isNumeric only accepts strings')
  return validator.isNumeric(number) || validator.isDecimal(number)
}

const isEmpty = value => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '')
  )
}

// Removes keys that have null or undefined values
const cleanObject = object => _.pickBy(object, prop => (prop !== undefined && prop !== null))

export { camelToLabel, isNumeric, isEmpty, cleanObject, clone }
