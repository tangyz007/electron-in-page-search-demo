const electron = require('electron')
const prompt = require('electron-prompt');
const { app, BrowserWindow, globalShortcut, ipcMain } = electron
const path = require('path')
let win
let child
const winURL = 'file://' + path.normalize(`${__dirname}/index.html`)
const searchURL = 'file://' + path.normalize(`${__dirname}/search.html`)
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
          child.on('close', () => {
            child = null;
            ipcMain.removeAllListeners();
            win.webContents.stopFindInPage('clearSelection');
            globalShortcut.unregister('CommandOrControl+F')
          })
          // add listener to message sent in renderer processs
          win.webContents.on('found-in-page', (event, result) => {
            console.log(result.activeMatchOrdinal.toString() + ' in ' + result.matches.toString());
            console.log(result.selectionArea);
          })
          ipcMain.on('search', (event, arg) => {
            win.webContents.findInPage(arg,{findNext: true});
          });
          ipcMain.on('clear', () => {
            win.webContents.stopFindInPage('clearSelection');
          });
          ipcMain.on('search_next_word', (event, arg) => {
            win.webContents.findInPage(arg,{findNext: false});
          });
          ipcMain.on('search_prev_word', (event, arg) => {
            const options = {forward: false, findNext: false};
            win.webContents.findInPage(arg, options);
          });
          ipcMain.on('close_search', () => {
            win.webContents.stopFindInPage('clearSelection');
            child.close();
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
