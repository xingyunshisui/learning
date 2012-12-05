self.on('click', function() {
  var title = document.title
  self.postMessage(title)
})