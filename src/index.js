import { AnyRule } from './rules/Any'
import { NumericRule } from './rules/Numeric'
import { StringRule } from './rules/String'
import Schema from './Schema'
import errorFormat from './errorFormat'
import validate from './validate'

class IsFactory {
  any() { return new AnyRule() }
  numeric(message) { return new NumericRule({}, message) }
  string(message) { return new StringRule({}, message) }
}

const Is = new IsFactory()

export { Is, Schema, errorFormat, validate }
