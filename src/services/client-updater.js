const { ipcRenderer } = require('electron')
const admZip = require('adm-zip')
const fs = require('fs')
const os = require('os')

exports.updateClient = async () => {
    //downloading a client archive
    let distroHost = process.env.VUE_APP_DISTRO_HOST
    ipcRenderer.send(
        'clientDownload', {
        url: distroHost + "/client-dummy.zip",
        properties: { directory: os.tmpdir() }
    }
    )
    ipcRenderer.on("download progress", (event, progress) => {
        //callback for client download
        let percent = Math.round(progress.percent*100)
        let total = Math.round(progress.totalBytes / 1000000)
        console.log('Download Progress: ' + percent)
        console.log('Total:' + total + ' Mb')
        console.log(progress)
    })
    ipcRenderer.on("download complete", async (event, filePath) => {
        //client downloaded to a temp folder
        console.log(filePath)
        console.log('prepairing a dir')
        //removing client folder and recreating it
        fs.rmdirSync('./client', { recursive: true })
        if (!fs.existsSync('./client')) {
            fs.mkdirSync('./client');
        }
        console.log('done perpairing a dir')
        //unziping a client to it's folder
        var zip = new admZip(filePath)
        console.log('start unzip')
        zip.extractAllTo("./client", true)
        //unziping complete, removing temp file
        console.log('finished unzip')
        fs.unlinkSync(filePath, console.log('temp file deleted'))
    })
}