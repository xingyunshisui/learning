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
 * 获取所有以点和中括号的属性访问表达式的对象及层级属性
 * @param {AST_PropAccess} propAccess
 * @return {Array}
 */
var calcProperties = function(propAccess) {
  var result = []
  if (isType(propAccess, 'PropAccess')) {
    var expression = propAccess.expression
    var property = getPropAccessProperty(propAccess)
    result.unshift(property)

    if (isType(expression, 'PropAccess')) {
      result = calcProperties(expression).concat(result)
    } else if (isType(expression, 'SymbolRef')) {
      result.unshift(expression.name)
    }
  }

  return result
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
        expression.name = filename
      } else if (name == 'module' && property == 'exports') {
        // module.exports = VALUE or module.exports.PROPERTY = VALUE
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

//    if (isType(expression, 'PropAccess')) {
//      if (isType(expression.expression, 'SymbolRef') && expression.expression.name == 'module') {
//        var _property = expression.property
//        if (isType(_property, 'String')) {
//          _property = _property.value
//        }
//
//        if (_property == 'exports') {
//
//        }
//      }
//    }
  }
}

var transformer = new uglifyjs.TreeTransformer(null, function(node) {
  if (isType(node, 'SimpleStatement')) {
    var body = node.body
    if (isType(body, 'Assign')) {
      var left = body.left
      if (isType(left, 'PropAccess')) {
        var properties = replaceExports(left)
//        var length = properties
//        if (properties[0] == 'module' && properties[1] == 'exports') {
//          useModuleExports = true
//          moduleExportsProperties.push(properties)
//          var _exports = module.exports
//          properties.slice(2, properties.length).forEach(function(property, index) {
//            if (index == length - 3) {
//              _exports[property] = body.right
//            } else {
//              if (!_exports[property]) {
//                _exports[property] = {}
//              }
//            }
//
//            _exports = _exports[property]
//          })
//        } else if (!useModuleExports && properties[0] == 'exports') {
//          // 先判断是否使用了 module.exports, 若使用了，则所有的 export.PROPERTY 均失效
//          exportsProperties.push(properties)
//        }
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

var ast = uglifyjs.parse(code3)

var ast2 = ast.transform(transformer);
console.log(ast2.print_to_string({
  beautify: true,
  indent_level: 2
}));

console.log("Original:");
console.log(ast.print_to_string({
  beautify:true,
  indent_level: 2
}));