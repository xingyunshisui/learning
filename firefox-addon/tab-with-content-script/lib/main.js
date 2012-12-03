var widget = require("widget").Widget({
  id: "mozilla-link",
  label: "给所有页面添加红色边框",
  contentURL: "http://www.mozilla.org/favicon.ico",
  onClick: listTabs
});
 
function listTabs() {
  var tabs = require("tabs");
  // 遍历所有 tab
  for each (var tab in tabs)
    runScript(tab);
}
 
function runScript(tab) {
  // 附上一个 content script 写页面 BODY 元素样式
  tab.attach({
    contentScript: "document.body.style.border = '5px solid red';"
  });
}