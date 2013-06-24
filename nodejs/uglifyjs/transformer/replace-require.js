var uglifyjs = require('uglify-js')
var isType = function(node, typeStr) {
  return node instanceof uglifyjs['AST_' + typeStr]
}

var targetAst = uglifyjs.parse('extsync.modules.util')

var transformer = new uglifyjs.TreeTransformer(null, function(node) {
  if (isType(node, 'Call')) {
    var expression = node.expression
    var args = node.args
    if (isType(expression, 'SymbolRef')) {
      if (expression.name == 'require') {
        return targetAst.body[0].body
      }
    }
  }
})
var code = function foo() {
  var u = extsync.modules.util
  var util = require('util')
  require('util').puts('hello uglifyjs')
}.toString()

var ast = uglifyjs.parse(code)
var ast2 = ast.transform(transformer)
console.log(ast2.print_to_string({beautify: true}))