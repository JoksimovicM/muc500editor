const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
    return win
}

app.whenReady().then(() => {
    const win = createWindow()
    ipcMain.handle('dialog', (event) => {
        dialog.showOpenDialog(win, {
            properties: [
                'openFile', 'multiSelections'
            ]
        }).then((value) => {
            let filePaths = value.filePaths
            if (Array.isArray(filePaths) && value.canceled !== true) {
                for (let i = 0; i < filePaths.length; i++) {
                    console.log(filePaths[i])
                }
            }
            return filePaths
        })
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
