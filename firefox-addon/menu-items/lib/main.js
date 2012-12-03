// 创建一个菜单项
var menuitem = require("menuitems").Menuitem({
  id: "clickme",
  menuid: "menu_ToolsPopup",
  label: "Click Me!",

  // 监听选择该菜单
  onCommand: function() {
    console.log("clicked");
  },

  // 插入菜单的位置，这里插入到页面信息菜单项前面
  insertbefore: "menu_pageInfo"
});