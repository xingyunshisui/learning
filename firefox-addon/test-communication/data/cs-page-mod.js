self.port.on('page-mode:port.emit', function(msg) {
  console.log('[CS PAGE MOD port.on] content script of PAGE MOD received message: ' + msg)
})

self.port.emit('cs-page-mode:port.emit', 'from cs-page-mode of type port.emit')

self.postMessage('from cs-page-mode of type postMessage', 'http://ruyi.etao.com')
self.on('message', function(msg) {
  console.log('[CS PAGE MOD onMessage] content script of PAGE MOD received message: ' + msg)
})

var keys = Object.keys(self)

console.log('=============== test CS API =====================')
console.log(keys.join(','))
console.log(Object.keys(self.port).join(','))
//console.log(require) // require 未定义
