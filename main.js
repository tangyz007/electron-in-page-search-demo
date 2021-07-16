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
 

  win.on('focus', (event) => {
    globalShortcut.register('CommandOrControl+F', function () {
      if (win && win.webContents) { 
        child = new BrowserWindow({ width: 200,
          height: 200, parent : win, titleBarStyle: 'hiddenInset', webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }})
          child.loadURL(searchURL)
          child.on('closed', () => {
            child = null
          })
          // add listener to message sent in renderer processs
          ipcMain.on('search', (event, arg) => {
            // window.alert(arg);
            console.log(arg);
            win.webContents.findInPage(arg);
          });
         
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
