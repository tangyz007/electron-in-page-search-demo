const electron = require('electron')
const prompt = require('electron-prompt');
const { app, BrowserWindow, globalShortcut, ipcMain } = electron
const path = require('path')
let win
let child
const winURL = 'file://' + path.normalize(`${__dirname}/index.html`)
const searchURL = 'file://' + path.normalize(`${__dirname}/search.html`)
// const searchBox = (
//   <div
//     id="modalbox"
//     style={{ display: 'none', position: 'fixed', zIndex: 1 }}
//   ><input type="text" onChange={Calls.searchPage} />
//   </div>);
// const winURL = '../index.html'
// const search_win = new BrowserWindow({ width: 200, height: 100, frame: false })
function createWindow () {   
  win = new BrowserWindow({ 
    width: 1280,
    height: 1040,
    center: false,
    webPreferences: {
      nodeIntegration: true,
      plugins: true,
      } 
  })
  win.loadURL(winURL)
  win.on('closed', () => {
    win = null
  })
 
  // add listener to message sent in renderer processs
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)
  // const reply = arg.split('').reverse().join('');
  // console.log('reply: ', reply);
  // send message to main process
  event.sender.send('asynchronous-reply', reply);
});

  win.on('focus', (event) => {
    globalShortcut.register('CommandOrControl+F', function () {
      if (win && win.webContents) {
      //   prompt({
      //     title: 'search text',
      //     label: 'Search:',
      //     inputAttrs: {
      //         type: 'text'
      //     },
      //     type: 'input',
      //     parentBrowserWindow: win
      // })
      // .then((r) => {
      //     if(r === null) {
      //         console.log('user cancelled');
      //     } else {
      //         console.log('result', r);
      //         win.webContents.findInPage(r)
      //         // event.preventDefault()
      //         // win.webContents.findInPage(r)
      //     }
      // })
      // .catch(console.error);

        child = new BrowserWindow({ width: 200,
          height: 200, parent: win, titleBarStyle: 'hiddenInset'})
          child.loadURL(searchURL)
          child.on('closed', () => {
            child = null
          })
          child.webContents.on('did-finish-load', ()=>{
            let code = `var search_button = document.getElementById('btn_search')
            search_button.addEventListener('click', () => {
                text = document.getElementById("myText").value = "Johnny Bravo";
                console.log(text);
            })`;
            child.webContents.executeJavaScript()
          })
          // child.webContents.send('on-find', '')
        // child.show()
        // win.webContents.findInPage("el")
        // dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
        // search_win.show()
        // win.webContents.send('on-find', '')
      }
    })
  })
  win.on('blur', () => {
    globalShortcut.unregister('CommandOrControl+F')
  })
  
}
  
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
  globalShortcut.unregister('CommandOrControl+F')
})

app.on('activate', () => {
  if (win === null) createWindow()
})
