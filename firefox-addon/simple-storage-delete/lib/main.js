var widgets = require("widget");
var ss = require("simple-storage");

var widget = widgets.Widget({
  id: "write",
  label: "Write",
  width: 50,
  content: "Write",
  onClick: function() {
    ss.storage.value = 1;
    console.log("Setting value");
  }
});

var widget = widgets.Widget({
  id: "read",
  label: "Read",
  width: 50,
  content: "Read",
  onClick: function() {
    console.log(ss.storage.value);
  }
});

var widget = widgets.Widget({
  id: "delete",
  label: "Delete",
  width: 50,
  content: "Delete",
  onClick: function() {
    delete ss.storage.value;
    console.log("Deleting value");
  }
});