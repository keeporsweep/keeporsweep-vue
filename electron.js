const {app, BrowserWindow, shell} = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

let url
if (process.env.NODE_ENV === 'DEV') {
  url = 'http://localhost:8080/'
} else {
  url = `file://${process.cwd()}/dist/index.html`
}
url = 'http://localhost:8080/'

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 400,
      minHeight: 400,
      icon: path.join(__dirname, 'src/assets/icon-512.png'),
      frame: false,
  })

/*  var recursive = require('recursive-readdir')

  recursive('.', function (err, files) {
    // `files` is an array of file paths
    console.log(files)
})*/

  // No menu bar (frame:false also removes title bar and controls)
  // win.setMenu(null)

  // and load the index.html of the app.
  // win.loadFile('index.html')
  win.loadURL(url)

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  // Open all target="_blank" links in external browser
  // Ref https://www.qcode.in/convert-vue-js-app-native-desktop-app-using-electron/
  let webContents = win.webContents
  webContents.on('new-window', function(event, url){
    event.preventDefault()
    shell.openExternal(url)
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
