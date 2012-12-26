var uglifyjs = require('uglify-js')
var util = require('util')

var code = 'function sum(x, y) {return x + y}'
var variableStatementCode = 'var name = 1;'
var ast = uglifyjs.parse(variableStatementCode)
ast.figure_out_scope()
console.log(util.inspect(ast, null, 3))