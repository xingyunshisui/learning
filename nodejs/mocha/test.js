var assert = require("assert")
require('should')

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })

    it('should return correspondent index value', function() {
      assert.equal(1, [0, 1, 2].indexOf(1))
      assert.equal(0, [0, 1, 2].indexOf(0))
    })
  })
})

describe('Compare Object', function() {
  var obj1 = {
    name: 'John',
    age: 25
  }

  var obj2 = {
    name: 'John',
    age: 25
  }

  it('对象内容应该相同', function() {
    obj1.should.not.equal(obj2)
    assert.deepEqual(obj1, obj2, 'obj1 和 obj2 的内容应该相同。')
    assert.notEqual(obj1, obj2, 'obj1 和 obj2 是两个不同的对象。')
    assert.notStrictEqual(obj1, obj2, 'obj1 和 obj2 是两个不同的对象。')
  })
})