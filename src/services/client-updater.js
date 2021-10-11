const { ipcRenderer } = require('electron')
const admZip = require('adm-zip')
const fs = require('fs')
const os = require('os')

exports.updateClient = async () => {
    let distroHost = process.env.VUE_APP_DISTRO_HOST
    ipcRenderer.send(
        'clientDownload', {
        url: distroHost + "/client.zip",
        properties: { directory: os.tmpdir() }
    }
    )
    ipcRenderer.on("download progress", (event, progress) => {
        console.log('Download Progress: '+progress.percent)
    })
    ipcRenderer.on("download complete", async (event, filePath) => {
        console.log(filePath)
        console.log('prepairing a dir')
        //removing client folder and recreating it
        fs.rmdirSync('./client', { recursive: true })
        if (!fs.existsSync('./client')) {
            fs.mkdirSync('./client');
        }
        console.log('done perpairing a dir')
        var zip = new admZip(filePath)
        console.log('start unzip')
        zip.extractAllTo("./client", true)
        console.log('finished unzip')
        fs.unlinkSync(filePath, console.log('temp file deleted'))
    })
}