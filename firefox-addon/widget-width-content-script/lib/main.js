var widgets = require("widget");
var tabs = require("tabs");
var self = require("self"); // self 模块？

var widget = widgets.Widget({
  id: "mozilla-link",
  label: "Mozilla website",
  contentURL: "http://www.mozilla.org/favicon.ico",
  contentScriptFile: self.data.url("click-listener.js") // 指定 data 文件夹中的 click-listener.js 为 content script
});

widget.port.on("left-click", function(){
  console.log("left-click");
});

widget.port.on("right-click", function(){
  console.log("right-click");
});