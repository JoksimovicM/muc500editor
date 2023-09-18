const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('dialogTest', {
    handleInput: async () => {
        return await ipcRenderer.invoke('handleInput')
    },
    serial: async () => {
        return await ipcRenderer.invoke('serial')
    },
    handleOutput: async () => {
        return await ipcRenderer.invoke('handleOutput')
    },
    deviceConf: async () => {
        return await ipcRenderer.invoke('deviceConf')
    },
    runScript: async () => {
        return await ipcRenderer.invoke('runScript')
    },
    test: async (file) => {
        return await ipcRenderer.invoke('inputFile', file)
    }
})