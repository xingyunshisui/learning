var widgets = require("widget");
var tabs = require("tabs");
 
var widget = widgets.Widget({
  id: "jQuery-link",
  label: "jQuery",
  contentURL: "http://www.jquery.com/favicon.ico",
  onClick: function() {
    tabs.open("http://www.jquery.com/");
  }
});