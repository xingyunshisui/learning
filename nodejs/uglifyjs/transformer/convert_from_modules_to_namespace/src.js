var name = document.getElementById('name')
var fs = require('fs')
var path = require('path')

require('fs').readDir(function(){

})

exports.sayHi = function() {}
exports.name = 'John'
exports.age = 25


var modules = {}

var module = {
  exports: {}
}


var require = function(moduleName) {
  var module = modules[moduleName]
  if (module) {
    return module
  } else {
    throw new Error('Can not find module \'' + moduleName + '\'')
  }
}

require.toString = function() {
  console.log('function require(moduleName) {\n  native code\n}')
}

(function() {
  var module = {
    exports: {}
  }

  var exports = module.exports

  var fs = require('fs')
  var path = require('path')
  exports.sayHi = function() {
    console.log('hi')
  }

  module.exports.sayHello = function() {
    console.log('hello')
  }

  exports.name = 'John'
})();

(function() {
  var http = require('http')
  module.exports = {
    getName: function() {},
    setName: function() {}
  }
})();