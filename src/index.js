import { AnyRule } from './any'
import { NumericRule } from './numeric'
import { StringRule } from './string'
import Schema from './schema'
import errorFormat from './errorFormat'
import validate from './validate'

class IsFactory {

  // Factories
  any() { return new AnyRule() }
  numeric(message) { return new NumericRule({}, message) }
  string(message) { return new StringRule({}, message) }

}

const Is = new IsFactory()

export { Is, Schema, errorFormat }
