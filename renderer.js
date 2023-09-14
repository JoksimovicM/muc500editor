const information = document.getElementById('info')
information.innerHTML = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

async function fileUpload() {
    const response = await window.dialogTest.openDialog()
    console.log(response)
}

const upload = document.getElementById('upload')
upload.addEventListener('click', () => {
    fileUpload()
})

