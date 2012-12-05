var data = require("self").data;

// Construct a panel, loading its content from the "text-entry.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.
var text_entry = require("panel").Panel({
  width: 212,
  height: 200,

  // 指定 popup 中的 html 文件
  contentURL: data.url("text-entry.html"),

  // 指定 popup 中的 content script 文件
  contentScriptFile: data.url("get-text.js"),
  contentScriptWhen: 'ready'
});

// Create a widget, and attach the panel to it, so the panel is
// shown when the user clicks the widget.
require("widget").Widget({
  label: "Text entry",
  id: "text-entry",
  contentURL: "http://www.mozilla.org/favicon.ico",

  // 指定 panel 对象
  panel: text_entry
});

// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
// object.on 监听来自系统的事件
text_entry.on("show", function() {
  // 发送 show 事件到 content script
  text_entry.port.emit("show");
});

// Listen for messages called "text-entered" coming from
// the content script. The message payload is the text the user
// entered.
// In this implementation we'll just log the text to the console.
// object.port.on 监听来自 content script 的事件
text_entry.port.on("text-entered", function (text) {
  console.log(text);
  text_entry.hide();
});