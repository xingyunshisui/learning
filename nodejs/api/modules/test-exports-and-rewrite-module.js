var fs = require('fs')

// 在核心对象上添加自定义方法
fs.doMyJob = function() {
  console.log('在 fs 模块上调用自己添加的方法 doMyJob')
}

exports.sayHi = function() {
  console.log('hi1')
}

module.exports.sayHello = function() {
  console.log('hello1')
}

module.exports = {
  sayHello: function() {
    console.log('hello2')
  }
}

module.exports = function() {
  console.log('module.exports is a function.')
}

module.exports.sayHi = function() {
  console.log('hi2')
}

// 结论：module.exports 会覆盖前面的 module.exports 和 exports.PROP

// 可以成功调用
fs.doMyJob()