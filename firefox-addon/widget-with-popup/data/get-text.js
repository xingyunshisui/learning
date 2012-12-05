// When the user hits return, send the "text-entered"
// message to main.js.
// The message payload is the contents of the edit box.
var textArea = document.getElementById("edit-box");
textArea.addEventListener('keyup', function onkeyup(event) {
  if (event.keyCode == 13) {
    // Remove the newline.
    text = textArea.value.replace(/(\r\n|\n|\r)/gm,"");

    // 触发 text-entered 事件。self 在 content script 中可以直接引用
    self.port.emit("text-entered", text);
    textArea.value = '';
  }

  // 尝试直接访问页面中定义的 js 变量，结果：失败
  console.log('name: ' + name)
  console.log('address: ' + window.address)

  // test unsafeWindow
  console.log('test unsafeWindow')
  console.log(unsafeWindow.address)
  unsafeWindow.variableFromCS = 'from-cs'
}, false);

// Listen for the "show" event being sent from the
// main add-on code. It means that the panel's about
// to be shown.
//
// Set the focus to the text area so the user can
// just start typing.
self.port.on("show", function onShow() {
  textArea.focus();
});