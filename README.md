# house-rules

[![Build Status](https://travis-ci.org/bradwestfall/house-rules.svg?branch=master)](https://travis-ci.org/bradwestfall/house-rules)

Create highly re-usable field/input validators for your project by chaining rules and creating an inventory of your project's common rules (a schema called your house rules). Then create sub-schemas for each validation context (like login or signup). Error messages are highly customizable at the rule level, the field level, or the group level.

## Install

```sh
npm install --save house-rules
```

## Example

```js
import { Is, Schema } from 'house-rules'

// Base Rule for IDs
const id = Is.numeric().positive().integer().required()

// Base Rule for Names (Allow Spaces)
const strict = false
const name = Is.string().alpha(strict)

// House Rules -- Imagine this could be a large inventory/schema for all the common rules in your project
const schema = new Schema({

  // Users
  userId: id.label('User ID'),
  firstName: name.label('First Name'),
  lastName: name.label('Last Name'),
  birthDate: Is.date('MM-DD-YYYY').beforeToday().label('Birth Date'),
  email: Is.string().email().required(),
  password: Is.string().minLength(8).maxLength(100).required(),
  userTypeId: Is.numeric().in([1, 2, 3]).required(),

  // Widgets
  widgetId: id.label('Widget ID'),
  widgetName: name.label('Widget Name'),

  // Pagination
  page: Is.numeric().positive().integer().required(),
  resultsPerPage: Is.numeric().positive().integer().required()

})

// Then sub-schemas can be made on a per-form or a per-api-route basis
const loginSchema = schema.clone(['email', 'password'])

const errors = loginSchema.validate({
  email: 'test@example.com',
  password: 'abc' // notice this is too short
})
```

`errors` is now:

```js
{
  password: {
    label: 'Password',
    value: 'abc',
    errors: [ 'Must be at least 8 characters' ]
  }
}
```


## Custom Labels

By Default, the labels in the error object will be derived from each field's respective name. Field names are given by passing an object into validation:

```js
userSchema.validate({
  firstName: 'Dave',
  lastName: 'Smith'
})
```

In this code, the `firstName` and `lastName` field names will become "First Name" and "Last Name" labels in any error messages. The default logic for formatting names turns camel-case names into more a more human-readable format. You can also provide your own custom label in the rules by chaining the `.label()` rule onto the field:

```js
const userSchema = new Schema({
  firstName: Is.string().label('Your First Name'),
  lastName: Is.string().label('Your Last Name')
})
```

## Per-rule Error Messages

By default, error messages will be an array where each value is a message from a failed rule. For example, a rule like `Is.string().ascii().minLength(6)` will fail with a value of `♠♣♦♥` since this value fails both rules. The error message might resemble this:

```js
{
  username: {
    label: 'Password',
    value: '♠♣♦♥',
    errors: [ 'Must only contain ASCII character', 'Must be at least 6 characters' ]
  }
}
```

However, most rules allow custom error messages as their last argument. For the previous example, the rule could have been written as `Is.string().ascii('No funky characters').minLength(6, 'Needs to be at least 6')` which would have changed the error response to be `errors: [ 'No funky characters', 'Needs to be at least 6' ]`.

> Each rule's API is documented below to see which ones accept custom error messages.


## Rule-wide Error Message

If only one message is needed for the entire rule, this can be achieved by chaining `.message()` onto the rule. For example, `Is.string().ascii('No funky characters').minLength(6, 'Needs to be at least 6').message('Invalid Password')` would create this error if any rule fails:

```js
{
  password: {
    label: 'Password',
    value: '♠♣♦♥',
    errors: [ 'Invalid Password' ]
  }
}
```

Notice that the use of `.message()` overrides even custom per-rule messages.


## Error Formatting

By default, errors are formatted like the examples above with error objects having one property for each rule that failed. The rule name property is also an object with a label, value, and errors array. The `Schema` API has an `.onError()` callback to customize the format of returned errors. The API comes with a default format but also comes with two additional formatters which are built in: `errorFormat.cobmine` and `errorFormat.combineWithLabels`.

They can be used like this:

```js
import { Is, Schema, errorFormat } from 'house-rules'

const schema = new Schema({
  password: Is.string().ascii('No funky characters').minLength(6, 'Needs to be at least 6')
}).onError(errorFormat.combine)

const errors = schema.validate({ password: '♠♣♦♥' })
```

### `errorFormat.combine`

This formatter will produce errors like this: `{ password: 'No funky characters, Needs to be at least 6' }`


### `errorFormat.combineWithLabels`

This formatter will produce errors like this: `{ password: 'Password: No funky characters, Needs to be at least 6' }`


### Custom Error Formatting

If you prefer to write your own formatter, just pass a callback into `.onError()`. The only argument that function will receive is the error object in the API's default format. What gets returned from that function is your custom formatted error:

```js
// You can write your own formatter and return anything you want
const customFormatter = errors => {
  return Object.keys(errors).length ? 'There were errors found' : ''
}

const schema = new Schema({
  password: Is.string().ascii().minLength(6)
}).onError(customFormatter)

console.log( schema.validate({ password: '♠♣♦♥' }) ) // "there were errors found"
```



# Rule API

All rules must start out by declaring `Is.string()`, `Is.numeric()`, or `Is.any()`. Once declared a rule cannot change from one type to another.

## `Is.any()`

Rules that start with `Is.any()` can use the following methods. But also note that all other types of rules like `Is.string()` and `Is.numeric()` inherit from `Is.any()` and they can also use these methods:

#### `.required([string message])`

Make a rule required. Note that this rule is special in that no matter where this rule exists in your chain of rules, it will be checked first and if it fails, the whole field is considered failed without further checking other rules.

#### `.optional()`

By default, all fields are not required unless `.required()` is specified. Therefore all rules are technically "optional" already. The practical use for this method is to remove the "required-ness" of a field if you need to.

This method is an alias to `.removeRule('required')`

#### `.in(array possible, [string message])`

Require the value to be among the possible values. The possible values must be an array. For example:

```js
Is.any().in([1,2,3]) // Requires the value to be 1, 2, or 3
```

#### `.custom(function callback)`

Create your own rule by passing a callback function into `.custom()`. The only argument that is passed into your callback is the value and the return value of our callback must be a string (if there is an error). Returning a non-string results in no error being reported. Also note that this method can only be used once per field.

#### `.label(string label)`

Add a custom label to the field for when it fails. By default the label is derived from the field name. In this code the field name is `email`:

```js
schema.validate({ email: 'a@a.com' })
```

If the field fails, the returned label would be "Email". However using `.label()` lets you customize this label to be different from the default.

#### `.message(string message)`

Add a custom message which overrides all rule messages for the entire field.

#### `.removeRule(string ruleName)`

Remove a rule that was previously set. Depending on your organizational strategy, you might make "base rules" which are used to start other rules. But you might want to remove some aspect of the base rule. Here's an example:

```js
// Base rule for anything that's an ID
const id = Is.numeric().integer().positive()

const schema = new Schema({
  userId: id,
  otherId: id.removeRule('integer')
})
```

Notice that `otherId` wants to be all the things that `id` is except being an integer.

#### `.toJSON()`

Return the internal object for the rule. This is mostly useful for debugging. This method should be at the end of your rule and cannot have other rules after it.



## `Is.string()`

Rules declared with `Is.String()` can use all of the following methods, plus any of the rules from the `Is.any()` set of methods.

#### `.length(integer length, [string message])`

Requires the string to be exactly `length` characters.

#### `.maxLength(integer max, [string message])`

Requires the string to be smaller or equal to `max` in terms of total characters.

#### `.minLength(integer min, [string message])`

Requires the string to be larger or equal to `max` in terms of total characters.

#### `.regex(literal expression, [string message])`

Requires the string to match the regular expression. The `expression` argument needs to be an [expression literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) and not a string.

#### `.email([string message])`

Requires the string to be in an email format as determined by [Validator](https://www.npmjs.com/package/validator).

#### `.ascii([string message])`

Requires the string to be only ASCII characters.

#### `.alpha(boolean strict, [string message])`

Requires the string to be only alphabetic characters. By default this excludes whitespace characters since `strict` is `true` by default. Setting `strict` to `false` will allow whitespace characters.

#### `.alphaNum(boolean strict, [string message])`

Requires the string to be only alphabetic and numeric characters. By default this excludes whitespace characters since `strict` is `true` by default. Setting `strict` to `false` will allow whitespace characters.

#### `.lowercase([string message])`

Requires the string to be lowercase for it's alphabetic characters.

#### `.uppercase([string message])`

Requires the string to be uppercase for it's alphabetic characters.



## `Is.numeric()`

Rules declared with `Is.numeric()` can use all of the following methods, plus any of the rules from the `Is.any()` set of methods. Strings which have only numeric values or numeric symbols as in `'-1.5'` are considered numeric in this API. As an example, the rule `Is.numeric().integer()` will evaluate the numeric value `1` and string value `'1'` as the same thing.

#### `.integer([string message])`

Requires the number to be an integer.

#### `.float(integer precision, [string message])`

Requires the number to be an float. Note that the number `1` (without decimal places is still a valid float). The `precision` argument allows the rule to specify a maximum number of decimal places.

#### `.min(integer minValue, [string message])`

Requires the number to be equal or above the `minValue`.

#### `.max(integer maxValue, [string message])`

Requires the number to be equal or below the `maxValue`.

#### `.positive([string message])`

Requires the number to be above `0`.

#### `.negative([string message])`

Requires the number to be below `0`.



## `Is.date(string format)`

Rules declared with `Is.date()` can use all of the following methods, plus any of the rules from the `Is.any()` set of methods. `house-rules` uses [MomentJS](https://momentjs.com) to verify dates are real. `Is.date(format)` requires a format (a Moment format) which is used to declare the format that values should be expected in. For example:

```js
const schema = new Schema({
  birthDate: Is.date('MM-DD-YYYY')
})

schema.validate({ birthDate: '11-14-1982' }) // valid
schema.validate({ birthDate: '11/14/1982' }) // invalid
schema.validate({ birthDate: '1982-11-14' }) // invalid
```

#### `.isSame(string date, [string message])`

Requires the value to be the same as `date`.

> See Notes Below.

#### `.isSameOrBefore(string date, [string message])`

Requires the value to be the same or before `date`.

> See Notes Below.

#### `.isSameOrAfter(string date, [string message])`

Requires the value to be the same or after `date`.

> See Notes Below.

#### `.isBefore(string beforeDate, [string message])`

Requires the value to be before `beforeDate`.

> See Notes Below.

#### `.isBeforeToday([string message])`

Requires the value to be before today.

> See Notes Below.

#### `.isAfter(string afterDate, [string message])`

Requires the value to be after `afterDate`.

> See Notes Below.

#### `.isAfterToday([string message])`

Requires the value to be after today.

> See Notes Below.

### Notes on previous statements

When providing a `format` to `Is.date(format)`, you're indicating the format you expect the value to be in. However, for the other methods after `.date()` which take date arguments, the format always needs to be in `YYYY-MM-DD` format.

In doing comparisons, Moment is smart enough to figure out formats. So for example, when we say that `isSame` requires the value to be the same as the provided date, notice that these are considered the same:

```js
const schema = new Schema({
  myDate: Is.date('MM/DD/YYYY').isSame('2000-01-01')
})

schema.validate({ myDate: '01/01/2000' }) // valid (same)
```

These two dates, even though they are written in a different format, are the same. Again, the value we provide is `01/01/2000` and must match our format `MM/DD/YYYY`, but we must express the arguments into `isSame` as `YYYY-MM-DD`.
