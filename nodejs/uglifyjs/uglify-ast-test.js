var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;

var orig_code = "var x = 1";
var ast = jsp.parse(orig_code); // 解析代码返回初始的AST
ast = pro.ast_mangle(ast); // 获取变量名称打乱的AST
ast = pro.ast_squeeze(ast); // 获取经过压缩优化的AST
var final_code = pro.gen_code(ast); // 压缩后的代码
console.log(final_code)