const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('node:path')
const fs = require('fs')


let serial_to_aks = ""
let device_configs = ""
let device_handle_input = ""
let device_handle_output = ""

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
    ipcMain.handle('handleInput', async (event) => {
        const value = await dialog.showOpenDialog(win, {
            properties: [
                'openFile'
            ]
        })
        if (value.canceled) {
            return []
        }
        device_handle_input = value.filePaths[0]
        return value.filePaths[0]
    })
    ipcMain.handle('handleOutput', async (event) => {
        const value = await dialog.showOpenDialog(win, {
            properties: [
                'openDirectory'
            ]
        })
        if (value.canceled) {
            return []
        }
        device_handle_output = value.filePaths[0]
        return value.filePaths[0]
    })
    ipcMain.handle('deviceConf', async (event) => {
        const value = await dialog.showOpenDialog(win, {
            properties: [
                'openDirectory'
            ]
        })
        if (value.canceled) {
            return []
        }
        device_configs = value.filePaths[0]
        return value.filePaths[0]
    })
    ipcMain.handle('serial', async (event) => {
        const value = await dialog.showOpenDialog(win, {
            properties: [
                'openFile'
            ]
        })
        if (value.canceled) {
            return []
        }
        serial_to_aks = value.filePaths[0]
        return value.filePaths[0]
    })
    ipcMain.handle('inputFile', async (event, fileItem) => {
        handleInput = fileItem
        fs.readFile(handleInput, {encoding: 'utf-8'}, (error, data) => {
            if (!error) {
                console.log('received data: ' + data)
            }
        })
        fs.copyFile(handleInput, "./Device_Handle.cfg", () => {
            console.log("OK")
        })
        
        return "ok"
    })
    // ipcMain.handle('runScript', () => {
    //     handleInput, serial_to_aks, device_configs
    // })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
