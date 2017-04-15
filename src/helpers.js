import validator from 'validator'

const camelToLabel = camelCase =>  {
  return camelCase.replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
}

const isNumeric = n => {
  if (typeof n !== 'string') throw new Error('isNumeric only accepts strings')
  return validator.isNumeric(n) || validator.isDecimal(n)
}

export { camelToLabel, isNumeric }
