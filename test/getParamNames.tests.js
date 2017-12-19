const assert = require('assert')
const getParamNames = require('../helpers').getParamNames
const messages = require('../messages')

function testFunc (chris, alice, bob) {
  return
}

context('getParamNames()', () => {
  describe('when given a function as an argument', () => {
    let result = getParamNames(testFunc)
    it('will return a properly ordered array of its arguments names', () => assert.deepEqual(result, ['chris','alice','bob']))
  })
})
