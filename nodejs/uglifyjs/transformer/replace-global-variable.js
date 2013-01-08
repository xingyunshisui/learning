var UglifyJS = require('uglify-js')

var consolidate = new UglifyJS.TreeTransformer(null, function (node) {
  if (node instanceof UglifyJS.AST_SimpleStatement) {
    var body = node.body
    if (body instanceof UglifyJS.AST_SymbolRef) {
      // a
      var varDef = new UglifyJS.AST_VarDef({
        name: new UglifyJS.AST_SymbolVar({ name: body.name })
      })
      return new UglifyJS.AST_Var({
        start: node.start,
        end: node.end,
        definitions: [varDef]
      })
    } else if (body instanceof UglifyJS.AST_Assign) {
      // a = 1
      var left = body.left
      if (left instanceof UglifyJS.AST_SymbolRef && left.thedef.undeclared) {
        var varDef = new UglifyJS.AST_VarDef({
          name: new UglifyJS.AST_SymbolVar({ name: left.name }),
          value: body.right
        })
        return new UglifyJS.AST_Var({
          start: node.start,
          end: node.end,
          definitions: [varDef]
        })
      }
    } else if (body instanceof UglifyJS.AST_Seq) {
      // a = 1, b = 2
      // a, b
      var variablesAndValues = getAllVariablesAndValues(body)
      return new UglifyJS.AST_Var({
        start: node.start,
        end: node.end,
        definitions: variablesAndValues.map(function(elem) {
          return new UglifyJS.AST_VarDef({
            name: new UglifyJS.AST_SymbolVar({name: elem[0]}),
            value: elem[1]
          })
        })
      })
    }
  }
});

var getAllVariablesAndValues = function(node) {
  var results = []
  var push = function(node) {
    if (node instanceof UglifyJS.AST_Assign) {
      // 有赋值的情况，这时候
      results.push([node.left.name, node.right])
    } else if (node instanceof UglifyJS.AST_SymbolRef && node.thedef.undeclared) {
      results.push([node.name, null])
    }
  }
  if (node instanceof UglifyJS.AST_Seq) {
    push(node.car)

    var cdr = node.cdr
    if (cdr instanceof UglifyJS.AST_Seq) {
      results = results.concat(getAllVariablesAndValues(cdr))
    } else {
      push(cdr)
    }
  }

  return results
}

var ast = UglifyJS.parse(function foo() {
  var b
  var d
  z
  x
  sayHi = function() {
    console.log('hi')
  }
  name = 'John'
  age = 25;
  a = 1, b =2, c = 3
  d, e, f

  module.exports = {}
  exports['sayHello'] = function() {}
  var pattern
  (function(){
    pattern = /^\d{4}$/
  })()
}.toString())
ast.figure_out_scope()

var ast2 = ast.transform(consolidate);
console.log(ast2.print_to_string({ beautify:true }));

console.log("Original:");
console.log(ast.print_to_string({ beautify:true }));