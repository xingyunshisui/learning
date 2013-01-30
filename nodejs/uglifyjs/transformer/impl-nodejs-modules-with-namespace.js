/*!
 * 使用命名空间模拟 nodejs 的模块机制
 *
 * Copyright(c) 2012 fornever <xingyunshisui@gmail.com>
 * MIT Licensed
 */

var uglifyjs = require('uglify-js')

var getRandomString = function() {
  return Math.floor(Math.random() * 2147483648).toString(36) +
    (Math.floor(Math.random() * 2147483648) ^ (new Date).getTime()).toString(36)
};

const TOP_LEVEL_OBJECT = 'ExtSync_Custom_Modules'
var useModuleExports = false

var require = function(moduleName) {
  var module = TOP_LEVEL_OBJECT[moduleName]
  if (module) {
    return module
  } else {
    throw new Error('Can not find module \'' + moduleName + '\'')
  }
}

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
  }
}