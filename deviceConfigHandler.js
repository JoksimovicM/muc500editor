const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')
const zip = new JSZip()

class DeviceConfigHandler {

    init(configPathUserData, configPathResources) {
        if (!fs.existsSync(configPathUserData)) {
            fs.mkdirSync(configPathUserData)
        }
        let files = fs.readdirSync(configPathResources, {encoding:'utf-8'})
        for (let file of files) {
            fs.copyFileSync(path.join(configPathResources, file), path.join(configPathUserData, file))
        }
        return configPathUserData
    }

    async importConfig(win, dialog, deviceConfigPath) {
        let value = await dialog.showOpenDialog(win, {properties:['openFile', 'multiSelections'], filters:[{
            name: 'Configs', extensions: ['device_conf']
        }]})
        if (value.canceled || value.filePaths.length === 0) {
            return []
        } else if (value.filePaths.length > 1) {
            for (let file of value.filePaths) {
                let fileContent = fs.readFileSync(file, {encoding:'utf-8'})
                let fileParts = file.split(/\\|\//)
                fs.writeFileSync(path.join(deviceConfigPath, fileParts[fileParts.length - 1]), fileContent, {encoding:'utf-8'})
                dialog.showMessageBox(win, {message: "New Device Configs were imported, form was reset", type:'info'})
            }
        } else {
            let fileContent = fs.readFileSync(value.filePaths[0], {encoding:'utf-8'})
            let filePath = value.filePaths[0]
            let fileParts = filePath.split(/\\|\//)
            fs.writeFileSync(path.join(deviceConfigPath, fileParts[fileParts.length - 1]), fileContent, {encoding:'utf-8'})
            dialog.showMessageBox(win, {message: "New Device Config was imported, form was reset", type:'info'})
        }
        return 200
    }

    async exportConfigs(win, dialog, configPathUserData) {
        let fileObjs = fs.readdirSync(configPathUserData, {encoding:'utf-8'})
        fileObjs.forEach(file => {
            let content = fs.readFileSync(path.join(configPathUserData, file), {encoding:'utf-8'})
            zip.file(file, content)
        })
        const value = await dialog.showSaveDialog(win, {
            title: "Save",
            filters: [{
                name:"zip", extensions: ['zip']
            }]
        })
        if (value.canceled) {
            return []
        } else {
            zip.generateNodeStream({type: 'nodebuffer', streamFiles: true})
            .pipe(fs.createWriteStream(value.filePath))
            .on('finish', function () {
                const res = dialog.showMessageBox(win, {type:'info', message:`ZIP saved to ${value.filePath}`, title:'Export Configs'})
            })
            return 200
        }
    }
}

module.exports = DeviceConfigHandler