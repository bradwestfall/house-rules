export const titleCase = function(camelCase) {
  return camelCase.replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
}
