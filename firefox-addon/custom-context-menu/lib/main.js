var contextMenu = require("context-menu");
var menuItem = contextMenu.Item({
  // 右键菜单显示的文字
  label: "Log Selection",

  // context 类型，这里是选中 context，当选中一段文字后出现该上下文菜单
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
               '  var text = window.getSelection().toString();' +
               '  self.postMessage(text);' +
               '});',

  // 用来接收来自 content script 的消息
  onMessage: function (selectionText) {
    console.log(selectionText);
  }
});