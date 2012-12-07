self.port.on('page-mode:port.emit', function(msg) {
  console.log('[CS PAGE MOD port.on] content script of PAGE MOD received message: ' + msg)
})

self.port.emit('cs-page-mode:port.emit', 'from cs-page-mode of type port.emit')

self.postMessage('from cs-page-mode of type postMessage', 'http://ruyi.etao.com')
self.on('message', function(msg) {
  console.log('[CS PAGE MOD onMessage] content script of PAGE MOD received message: ' + msg)
})