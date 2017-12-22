module.exports = {
  invalidArgument: (arg, func, types) => `Argument '${arg}' of function '${func}' must be of type(s) '${types}'.`,
  fatArrowNotSupported: (func) => `The '${func}' function cannot perform argument validation inside of 'fat arrow' functions.`
}
