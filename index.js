const helpers = require('./helpers')
const messages = require('./messages')

function checkArguments () {
  let caller = arguments.caller || checkArguments.caller
  let callerArgNames = helpers.getParamNames(caller)
  let callerArgs = caller.arguments
  let warnings = []
  let validators = arguments[0]
  for (let i = 0; i < callerArgNames.length; i++) {
    let valid = false
    let validTypes = validators[callerArgNames[i]] || []
    for (let j = 0; j < validTypes.length; j++) {
      if (typeof callerArgs[i + ''] === validTypes[j]) valid = true
    }
    if (!valid) warnings.push(messages.warning(callerArgNames[i], caller.name, validTypes.join(',')))
  }

  return {
    warnings,
    log: () => warnings.forEach((warning) => console.warn(warning))
  }
}

module.exports = {
  checkArguments
}
