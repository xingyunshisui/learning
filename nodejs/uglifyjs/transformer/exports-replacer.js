var uglifyjs = require('uglify-js')
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