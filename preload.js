const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('dialog', {
    serial: async (filePath) => {
        return await ipcRenderer.invoke('serialToAks', filePath)
    },
    runScript: async () => {
        return await ipcRenderer.invoke('runScript')
    },
    handleInput: async (filePath) => {
        return await ipcRenderer.invoke('handleInput', filePath)
    },
    importConfig: async () => {
        return await ipcRenderer.invoke('importConfig')
    },
    exportConfigs: async () => {
        return await ipcRenderer.invoke('exportConfigs')
    },
    showConfigs: async () => {
        return await ipcRenderer.invoke('showConfigs')
    }
})