const assert = require('assert')
const checkArguments = require('../index').checkArguments
const messages = require('../messages')

let _warn

context('checkArguments()', () => {
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
    it('warning 1 has correct message', () => assert(result.warnings[0] === messages.warning('a', 'func', 'number')))
    it('warning 2 has correct message', () => assert(result.warnings[1] === messages.warning('b', 'func', 'object')))
    it('warning 3 has correct message', () => assert(result.warnings[2] === messages.warning('c', 'func', 'string')))
  })
})
