addon.port.on('show', function() {
  document.body.innerHTML += 'Popup is shown.'
})

// 即使panel没有打开，这段代码也执行了，wtf！
addon.port.emit('msg', {topic: 'say_hi', from: 'popup page script'})


document.body.innerHTML += Object.keys(addon).join(',')