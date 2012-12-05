self.port.on('page-mode:port.emit', function(msg) {
  console.log('[CS PAGE MOD] content script of PAGE MOD received message: ' + msg)
})

self.port.emit('cs-page-mode:port.emit', 'from cs-page-mode of type port.emit')