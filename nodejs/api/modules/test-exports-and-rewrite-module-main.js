// 测试 nodejs 核心对象是否可添加自定义属性（结论：可以）
// 以及 modules 的覆盖情况（结论：后添加的 module.exports 会覆盖前面的 module.exports 和 exports.PROP）
var myModule = require('./test-exports-and-rewrite-module')
var fs = require('fs')

// 测试 fs 的自定义方法是否可调用，结论：可以。
fs.doMyJob()

if (myModule.constructor === Function) {
  myModule()
  if (myModule.sayHi) {
    myModule.sayHi()
  }
} else if (myModule.constructor === Object) {
  if (myModule.sayHello) {
    myModule.sayHello()
  }

  if (myModule.sayHi) {
    myModule.sayHi()
  }
} else if (myModule.constructor === Number) {
  console.log('I am a number')
  console.log(myModule)
  if (myModule.sayHi) {
    myModule.sayHi()
  }
} else if (myModule.constructor === RegExp) {
  console.log('I am a regexp')
  console.log(myModule)
  if (myModule.sayHi) {
    myModule.sayHi()
  }
} else if (myModule.constructor === String) {
  console.log('I am a string')
  console.log(myModule)
  if (myModule.sayHi) {
    myModule.sayHi()
  }
}