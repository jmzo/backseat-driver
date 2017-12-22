const assert = require('assert')
const checkArguments = require('../index').checkArguments
const messages = require('../messages')

context('checkArguments()', () => {
  describe('when given arguments matching the functions specs', () => {
    let result
    function func (a, b, c) {
      result = checkArguments({
        a: ['number', 'string'],
        b: ['object'],
        c: ['string']
      })
    }
    func(2, {}, 'hello')
    it('will return 0 warnings', () => assert(Array.isArray(result.warnings) && result.warnings.length === 0))
    func('hello', {}, 'hello')
    it('will return 0 warnings', () => assert(Array.isArray(result.warnings) && result.warnings.length === 0))
  })

  describe('when given no arguments to a function expecting 3 arguments', () => {
    let result
    function func (a, b, c) {
      result = checkArguments({
        a: ['number'],
        b: ['object'],
        c: ['string']
      })
    }
    func()
    it('will return 3 warnings', () => assert(Array.isArray(result.warnings) && result.warnings.length === 3))
    it('warning 1 has correct message', () => assert(result.warnings[0] === messages.invalidArgument('a', 'func', 'number')))
    it('warning 2 has correct message', () => assert(result.warnings[1] === messages.invalidArgument('b', 'func', 'object')))
    it('warning 3 has correct message', () => assert(result.warnings[2] === messages.invalidArgument('c', 'func', 'string')))
  })

  describe('when given arguments not matching the functions specs', () => {
    let result
    function func (a, b, c) {
      result = checkArguments({
        a: ['number'],
        b: ['object'],
        c: ['string']
      })
    }
    func('hello', 5, {})
    it('will return 3 warnings', () => assert(Array.isArray(result.warnings) && result.warnings.length === 3))
    it('warning 1 has correct message', () => assert(result.warnings[0] === messages.invalidArgument('a', 'func', 'number')))
    it('warning 2 has correct message', () => assert(result.warnings[1] === messages.invalidArgument('b', 'func', 'object')))
    it('warning 3 has correct message', () => assert(result.warnings[2] === messages.invalidArgument('c', 'func', 'string')))
  })

  describe('when called within an arrow function', () => {
    let result
    let func = (a, b, c) => {
      result = checkArguments({
        a: ['number'],
        b: ['object'],
        c: ['string']
      })
    }
    func('hello', 5, {})
    it('will return 1 warnings', () => assert(Array.isArray(result.warnings) && result.warnings.length === 1))
    it('warning 1 has correct message', () => assert(result.warnings[0] === messages.fatArrowNotSupported('checkArguments')))
  })
})
