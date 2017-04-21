const errorFormat = {

  combine(errors) {
    const newErrors = {}
    for (let key in errors) {
      newErrors[key] = errors[key].errors.join(', ')
    }
    return newErrors
  },

  combineWithLabels(errors) {
    const newErrors = {}
    for (let key in errors) {
      newErrors[key] = errors[key].label + ': ' + errors[key].errors.join(', ')
    }
    return newErrors
  }

}

export default errorFormat
