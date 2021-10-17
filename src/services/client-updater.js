const { ipcRenderer } = require('electron')
const admZip = require('adm-zip')
const fs = require('fs')
const os = require('os')
module.exports = {
    checkForUpdates: async () => {
        let distroHost = process.env.VUE_APP_DISTRO_HOST
        try {
            //getting local distro version
            let distro = require('../../distribution.json');
            //getting remote distro version
            const response = await fetch(distroHost + 'distribution.json');
            const remoteDistro = await response.json();
            console.log(distro.version, remoteDistro.version)
            //comparing versions and starting update function if remote != local
            if (distro.version !== remoteDistro.version) {
                console.log('client download required')
                //passing a version # to a download url
                return remoteDistro.version
            } else {
                console.log('client is up to date')
                return false
            }
        } catch (ex) {
            console.log('distro.json not exists')
            return null
        }

    },

    updateClient: async(version) => {
        //downloading a client archive
        let distroHost = process.env.VUE_APP_DISTRO_HOST
        ipcRenderer.send(
            'clientDownload', {
                url: distroHost + 'versions/' + version + '/client.zip',
                properties: { directory: os.tmpdir() }
        }
        )
        ipcRenderer.on("download progress", (event, progress) => {
            //callback for client download
            let percent = Math.round(progress.percent*100)
            let total = Math.round(progress.totalBytes / 1000000)
            console.log('Download Progress: ' + percent)
            console.log('TotalMb:' + total + ' Mb')
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
            console.log('done prepairing a dir')
            //unziping a client to it's folder
            var zip = new admZip(filePath)
            console.log('start unzip')
            zip.extractAllTo("./client", true)
            //unziping complete, removing temp file
            console.log('finished unzip')
            fs.unlinkSync(filePath, console.log('temp file deleted'))
        })
    }
}