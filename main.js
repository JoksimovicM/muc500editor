const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const { XMLParser, XMLBuilder, XMLValidator } = require('fast-xml-parser')
const formatXml = require('xml-formatter')
const decompress = require('decompress')
const path = require('node:path')
const fs = require('fs')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.setMenu(null)
    win.setResizable(false)
    win.loadFile('index.html')
    return win
}

const parser = new XMLParser()
const builder = new XMLBuilder()
const DeviceConfigHandler = require('./deviceConfigHandler')
const handler = new DeviceConfigHandler()

let inputHandleData

let deviceConfigFile
let deviceConfigPath
let serialToAks = {}

let xmlContent = "<?xml version='1.0' encoding='UTF-8'?>\n"
let device_handle_output = {}

const configPathUserData = path.join(app.getPath('userData'), 'device_configs')
const configPathResources = path.join("resources", "app.asar", "device_configs")

app.whenReady().then(() => {

    deviceConfigPath = handler.init(configPathUserData, configPathResources)
    
    const win = createWindow()
    
    ipcMain.handle('handleInput', async (event, fileItem) => {
        let data
        if (fileItem.includes("tar.gz")) {
            await decompress(fileItem, path.join(app.getPath('userData'), "export_tar")).then(files => {
            })
            try {
                data = fs.readFileSync(path.join(app.getPath('userData'), "export_tar", "Device_Handle.cfg"), {encoding: 'utf-8'})
                fs.rmSync(path.join(app.getPath('userData'), "export_tar"), {force: true, recursive: true})
            } catch (error) {
                console.log(error)
            }
        } else if (fileItem.includes("cfg")) {
            try {
                data = fs.readFileSync(fileItem, {encoding: 'utf-8'})
            } catch (error) {
                console.log(error)
            }
        }
        inputHandleData = parser.parse(data)
        return 200
    })
    ipcMain.handle('serialToAks', async (event, fileItem) => {
        let data
        try {
            data = fs.readFileSync(fileItem, {encoding: 'utf-8'})
        } catch (error) {
            const res = dialog.showMessageBox(win, {type:'Error', message:"Couldn't open file"})
            return 400
        }
        let rows = data.split("\r\n")
        let regex = /[0-9]+;[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}\.[0-9]+_([0-9]+(\.[0-9]+)+)\+[A-Za-z0-9]+=([A-Za-z0-9]+(\.[A-Za-z0-9]+)+)/i
        
        for (let row of rows) {
            if (!regex.test(row) && row !== '') {
                const res = dialog.showMessageBox(win, {type:'warning', message:"Invalid Format\nEncoding: UTF-8\nCorrect Format:\n" +
                "Serial;Userlabel\n22047987;c9c2b5d2-b9..."
                })
                return 400
            }
        }
        for (let row of rows) {
            if (row !== '') {
                serialToAks[row.split(";")[0]] = row.split(";")[1]
            }
        }
        imitateScript(win)
        return 200
    })
    ipcMain.handle('runScript', async (event) => {
        const value = await dialog.showSaveDialog(win, {
            title: "Save",
            filters: [{
                name:"cfg", extensions: ['cfg']
            }]
        })
        if (value.canceled) {
            return []
        } else {
            fs.writeFileSync(value.filePath, xmlContent, {encoding: 'utf-8'})
            return 200
        }
    })
    ipcMain.handle('importConfig', async () => {
        return await handler.importConfig(win, dialog, deviceConfigPath)
    })
    ipcMain.handle('exportConfigs', async () => {
        return await handler.exportConfigs(win, dialog, configPathUserData)
    })
    ipcMain.handle('showConfigs', async () => {
        const value = dialog.showOpenDialogSync(win, {defaultPath: deviceConfigPath})
    })
})

function imitateScript(win) {
    let missingConfigs = []
    let root = inputHandleData['root']
    for (let meter in root['meter']) {
        let manufacturer = root['meter'][meter]['manufacturer']
        let version = root['meter'][meter]['version']

        deviceConfigFile = manufacturer + "_" + version + ".device_conf"

        let serial = root['meter'][meter]['serial']
        if (serial in serialToAks) {
            //User überschreiben
            if (root['meter'][meter]['user'] !== undefined) {
                root['meter'][meter]['user'] = serialToAks[serial]
            } else {
                root['meter'][meter]['user'] = serialToAks[serial]
            }
        } else {
            console.log(`Serial ${serial} not found in meter_conf\n`)
        }
        
        let id = 0
        let configs = {}
        try {
            configs = JSON.parse(fs.readFileSync(path.join(deviceConfigPath, deviceConfigFile), {encoding: 'utf-8'}))
        } catch (error) {
            if (!missingConfigs.includes(deviceConfigFile)) {
                missingConfigs.push(deviceConfigFile)
            }
        }
        
        //Check if meter has values
        if (root['meter'][meter]['value'] !== undefined) {
            //Check if meter has more than one value
            if (root['meter'][meter]['value'] instanceof Array) {
                for (let valueObj in root['meter'][meter]['value']) {
                    if (Object.keys(configs).length !== 0) {
                        if (String(id) in configs) {
                            root['meter'][meter]['value'][valueObj]['user'] = configs[String(id)]['userlabel']
                            root['meter'][meter]['value'][valueObj]['userscale'] = configs[String(id)]['userscale']
                        }
                    }
                    id++
                }
            } else {
                console.log("Only one entry")
            }
        } else {
            console.log(`No values in ${JSON.stringify(meter)}`)
        }
    }
    if (missingConfigs.length > 0) {
        let message = "Following Device-Configs could not be found:\n"
        for (let index in missingConfigs) {
            message += missingConfigs[index] + "\n"
        }
        const res = dialog.showMessageBox(win, {type:'warning', message:message})
    }
    device_handle_output['root'] = root
    builtXML = builder.build(device_handle_output)
    xmlContent += formatXml(builtXML, {collapseContent:true})
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
