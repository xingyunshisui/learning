// content script 文件定义在 data 文件夹，这里的 content script 和 chrome extension 中的 cs 有不同
// window 貌似指的是 firefox 框架的 window 对象
window.addEventListener('click', function(event) {
  if (event.button == 0 && event.shiftKey == false)
    self.port.emit('left-click');

  if(event.button == 2 || (event.button == 0 && event.shiftKey == true))
    self.port.emit('right-click');
    event.preventDefault();
}, true);