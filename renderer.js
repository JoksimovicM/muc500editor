async function fileUpload(element) {
    if (element.id === "handleInput") {
        const response = await window.dialogTest.handleInput()
        console.log(response)
    } else if (element.id === "serialToAks") {
        const response = await window.dialogTest.serial()
        console.log(response)
    }

}
async function chooseFolder(element) {
    if (element.id === "handleOutput") {
        const response = await window.dialogTest.handleOutput()
        console.log(response)
    } else if (element.id === "deviceConf") {
        const response = await window.dialogTest.deviceConf()
        console.log(response)
    }
}

async function runScript() {}

const handleInput = document.getElementById('handleInput')
const handleOutput = document.getElementById('handleOutput')
const serial = document.getElementById('serialToAks')
const deviceConf = document.getElementById('deviceConf')

const fileItem = document.getElementById('fileItem')
fileItem.addEventListener('change', async () => {
    const file = fileItem.files[0]
    const response = await window.dialogTest.test(file.path)
})

handleInput.addEventListener('click', () => {
    fileUpload(handleInput)
})
serial.addEventListener('click', () => {
    fileUpload(serial)
})
handleOutput.addEventListener('click', () => {
    chooseFolder(handleOutput)
})
deviceConf.addEventListener('click', () => {
    chooseFolder(deviceConf)
})

