/*
Inspired by React's Prop Validation
*/
function checkArguments () {
  let caller = arguments.caller || checkArguments.caller
  let callerArgNames = getParamNames(caller)
  let callerArgs = caller.arguments
  let msgs = []
  let validators = arguments[0]
  for (let i = 0; i < callerArgNames.length; i++) {
    let valid = false
    let validTypes = validators[callerArgNames[i]] || []
    for (let j = 0; j < validTypes.length; j++) {
      if (typeof callerArgs[i + ''] === validTypes[j]) valid = true
    }
    if (!valid) msgs.push(`Argument '${callerArgNames[i]}' of function '${caller.name}' must be of type(s) '${validTypes.join(',')}'.`)
  }
  msgs.forEach((msg) => console.warn(msg))
}

// https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
let STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg
let ARGUMENT_NAMES = /([^\s,]+)/g
function getParamNames (func) {
  let fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}

module.exports = {
  checkArguments
}