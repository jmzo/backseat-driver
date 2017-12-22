const helpers = require('./helpers')
const messages = require('./messages')

function checkArguments () {
  let caller
  let callerArgs
  let warnings = []

  // "Fat Arrow" functions not supported
  try {
    caller = arguments.caller || checkArguments.caller
    callerArgs = caller.arguments
  } catch (e) {
    warnings.push(messages.fatArrowNotSupported('checkArguments'))
    return {
      warnings,
      log: () => warnings.forEach((warning) => console.warn(warning))
    }
  }

  let callerArgNames = helpers.getParamNames(caller) // Get caller argument names in order.
  let validators = arguments[0] // Get validators by which to check argument values.

  for (let i = 0; i < callerArgNames.length; i++) {
    let valid = false
    let validTypes = validators[callerArgNames[i]] || []
    for (let j = 0; j < validTypes.length; j++) {
      if (typeof callerArgs[i + ''] === validTypes[j]) valid = true
    }
    if (!valid) warnings.push(messages.invalidArgument(callerArgNames[i], caller.name, validTypes.join(',')))
  }

  return {
    warnings,
    log
  }
}

function log () {
  let warnings = this.warnings || []
  warnings.forEach((warning) => console.warn(warning))
  return this
}

module.exports = {
  checkArguments
}
