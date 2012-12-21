var self = require('self')
var panel = require('panel')
var widget = require('widget')
var contextMenu = require('context-menu')
var pageMode = require('page-mod')

// data 目录引用
var data = self.data

// 测试 addon 内资源文件路径
console.log(data.url('images/cc.jpg'))

pageMode.PageMod({
  include: '*',
  contentScriptFile: data.url('cs-page-mod.js'),
  contentScriptWhen: 'ready',
  attachTo: ['top', 'existing'],
  onAttach: function(worker) {
    worker.port.emit('page-mode:port.emit', 'from page-mode of type port.emit')
    worker.port.on('cs-page-mode:port.emit', function(msg) {
      console.log('[Addon Script port.on] page mode worker received message: ' + msg)
    })

    worker.postMessage('from page-mode of type postMessage')
    worker.on('message', function(msg) {
      console.log('[Addon Script postMessage] page mode worker received message: ' + msg)
    })
  }
})

var popup = panel.Panel({
  width: 450,
  height: 200,

  // 指定 popup 中的 html 文件
  contentURL: data.url("popup.html")

  // 指定 popup 中的 content script 文件
  // 指定了 popup 的content script 后，contentURL 指定的 HTML 文件中的 page script 将失效
//  contentScriptFile: data.url("cs-popup.js"),
//  contentScriptWhen: 'ready'
})

var menuItem = contextMenu.Item({
  // 右键菜单显示的文字
  label: "Log Selection",

  // context 类型，这里是选中 context，当选中一段文字后出现该上下文菜单
  context: contextMenu.PageContext(),
  contentScriptFile: data.url('cs-context-menu.js'),

  // 用来接收来自 content script 的消息
  onMessage: function (title) {
    console.log('Title of current active tab: ' + title);
  }
});

widget.Widget({
  label: "通信测试",
  id: "text-entry",
  contentURL: "http://ruyi.etao.com/favicon.ico",
  panel: popup
})

popup.on("show", function() {
  console.log('Popup shown.')
  // 发送 show 事件到 content script
  popup.port.emit("show");
});

popup.port.on("text-entered", function (text) {
  console.log(text);
  popup.hide();
});

popup.port.on('msg', function(req) {
  console.log('Received msg event.')
  console.log(req.topic)
  console.log(req.from)
})