import _ from 'lodash'
import validator from 'validator'

export const camelToLabel = camelCase =>  {
  return camelCase.replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
}

export const isNumeric = number => {
  if (typeof number !== 'string') throw new Error('isNumeric only accepts strings')
  return validator.isNumeric(number) || validator.isDecimal(number)
}

export const isEmpty = value => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '')
  )
}

// Removes keys that have null or undefined values
export const cleanObject = object => _.pickBy(object, prop => (prop !== undefined && prop !== null))
