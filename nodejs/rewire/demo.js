var rewire = require('rewire')
var myModule = rewire('./my-module.js')
var requiredMyModule = require('./my-module')


myModule.__set__("myPrivateVar", 123);
var myPrivateVar = myModule.__get__("myPrivateVar"); // = 123
console.log('Value of myPrivateVar: ' + myPrivateVar)

var internalSayHelloOfMyModule = myModule.__get__('internalSayHello')
internalSayHelloOfMyModule('John')

console.log(requiredMyModule.internalSayHelloOfMyModule)
console.log(requiredMyModule.myPrivateVar)