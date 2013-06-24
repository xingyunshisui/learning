var uglifyjs = require('uglify-js')
const TOP_LEVEL_NAMESPACE = 'extsync'
var filename = 'extension'

var useModuleExports = false
var moduleExportsProperties = []
var exportsProperties = []
var module = {
  exports: {}
}
var exports = {}

var isType = function(node, typeStr) {
  return node instanceof uglifyjs['AST_' + typeStr]
}

var getPropAccessProperty = function(propAccess) {
  if (isType(propAccess, 'PropAccess')) {
    var property = propAccess.property
    if (isType(property, 'String')) {
      // For AST_Sub
      property = property.value
    }

    return property
  }
  return null
}

/**
 * 直接替换 module.exports 和 exports
 * @param propAccess
 */
var replaceExports = function(propAccess) {
  if (isType(propAccess, 'PropAccess')) {
    var expression = propAccess.expression
    var property = getPropAccessProperty(propAccess)

    if (isType(expression, 'PropAccess')) {
      replaceExports(expression)
    } else if (isType(expression, 'SymbolRef')) {
      // 这里到了属性访问表达式的最顶层对象
      var name = expression.name
      if (name == 'exports') {
        // exports.PROPERTY = VALUE
        if (useModuleExports) {
          propAccess.expression = null
        } else {
          expression.name = filename
        }
      } else if (name == 'module' && property == 'exports') {
        // module.exports = VALUE or module.exports.PROPERTY = VALUE
        useModuleExports = true
        if (isType(propAccess, 'Dot')) {
          propAccess.property = filename
        } else {
          propAccess.property = new uglifyjs.AST_String({
            value: filename
          })
        }
        propAccess.expression = new uglifyjs.AST_SymbolRef({
          name: TOP_LEVEL_NAMESPACE
        })
      }
    }
  }
}

var walker = new uglifyjs.TreeWalker(function(node) {
  if (isType(node, 'SimpleStatement')) {
    var body = node.body
    if (isType(body, 'Assign')) {
      var left = body.left
      if (isType(left, 'PropAccess')) {
        var properties = replaceExports(left)
      }
    }
  }
})

var code1 = function foo() {
  exports['foo'] = function() {};
  exports.bar = 'str';
  custom.exports.bar = 'ooxx'

  module.exports = {}
  module.exports = {
    name: 'John',
    age: 25
  }

  module.exports.sayHi = function(){}
  module.exports.obj1.sayHi = 'ox'
  ns.module.exports.sayHi = function() {}
}.toString()

var code2 = function foo() {
  module.exports = 1
  module['exports'] = {
    getName: function() {},
    setName: function() {}
  }
}.toString()

var code3 = function foo() {
  exports['name'] = 'John'
  module.exports = function() {}
}.toString()

var ast = uglifyjs.parse(code1)

// var ast2 = ast.walk(walker);
// console.log(ast2.print_to_string({
//  beautify: true,
//  indent_level: 2
// }));

console.log("Original:");
console.log(ast.print_to_string({
  beautify:true,
  indent_level: 2
}));