const fileItem = document.getElementById('fileItem')
const serialElements = document.getElementsByClassName("csvSerial")
fileItem.addEventListener('change', async () => {
    const file = fileItem.files[0]
    const response = await window.dialog.handleInput(file.path)
    serialElements.item(0).style.opacity = "1"
    serialElements.item(0).style.pointerEvents = "all"
})

const serialFile = document.getElementById('serialFile')
serialFile.addEventListener('change', async () => {
    const file = serialFile.files[0]
    const response = await window.dialog.serial(file.path)
    if (response === 400) {
        serialFile.value = ""
    }
    console.log(response)
})

const okBtn = document.getElementById('runScript')
okBtn.addEventListener('click', async () => {
    const response = await window.dialog.runScript()
    location.reload()
})

const importBtn = document.getElementById('importConfigs')
importBtn.addEventListener('click', async () => {
    const response = await window.dialog.importConfig()
    if (response === 200) {
        location.reload()
    }
})

const exportBtn = document.getElementById('exportConfigs')
exportBtn.addEventListener('click', async () => {
    const response = await window.dialog.exportConfigs()
})

const showBtn = document.getElementById('showConfigs')
showBtn.addEventListener('click', async () => {
    const response = await window.dialog.showConfigs()
})

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "30%";
}
  
/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
