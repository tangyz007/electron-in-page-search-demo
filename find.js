const { remote, ipcRenderer, ipcMain } = require('electron')
var search_button = document.getElementById('btn_search')
search_button.onclick = function () {
    var message = document.getElementById('message').value;
    window.alert(message)
    console.log(message)
    // ipcRenderer.send to send to main process
    ipcMain.emit('search');
  }
  //
  ipcRenderer.on('asynchronous-reply', function (event, arg) {
    alert(arg);
  });
// search_button.addEventListener('click', () => {
//     text = document.getElementById("myText").value = "Johnny Bravo";
    
// })
ipcRenderer.on('on-find', () => {
    console.log("success")
  });
