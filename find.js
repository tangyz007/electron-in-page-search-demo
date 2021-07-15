const { remote, ipcRenderer } = require('electron')
// var text = ''
// const { FindInPage } = require('../src/index.js')


// let findInPage = new FindInPage(remote.getCurrentWebContents(), {
//   preload: true,
//   offsetTop: 6,
//   offsetRight: 10
// })

// let findInPage = new FindInPage(remote.getCurrentWebContents(), {
//   boxBgColor: '#333',
//   boxShadowColor: '#000',
//   inputColor: '#aaa',
//   inputBgColor: '#222',
//   inputFocusColor: '#555',
//   textColor: '#aaa',
//   textHoverBgColor: '#555',
//   caseSelectedColor: '#555',
//   offsetTop: 8,
//   offsetRight: 12
// })

// ipcRenderer.on('on-find', (e, args) => {
//   findInPage.openFindWindow()
// })
// function getData(){
//     console.log('Called!!!');
// }

// ipc.once('actionReply', function(event, response){
    //     processResponse(response);
    // })
    // ipc.send('asynchronous-message', text);
    // // console.log(text)
    // ipc.on('asynchronous-reply', function (event, arg) {
    //     const message = `Asynchronous message reply: ${arg}`
    //     document.getElementById('async-reply').innerHTML = message
    //   })
var search_button = document.getElementById('btn_search')
search_button.onclick = function () {
    var message = document.getElementById('message').value;
    console.log(message)
    // ipcRenderer.send to send to main process
    ipcRenderer.send('asynchronous-message', message);
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
    // window.find("el")
//     const modalbox = document.getElementById('modalbox');
//    if (modalbox.style.display === 'block') {
//      modalbox.style.display = 'none';
//   } else {
//     modalbox.style.display = 'block';
//    }
  });
