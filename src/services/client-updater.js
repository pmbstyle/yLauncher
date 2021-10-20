const { ipcRenderer } = require('electron')
const admZip = require('adm-zip')
const fs = require('fs')
const os = require('os')
module.exports = {
    checkForUpdates: async () => {
        let distroHost = process.env.VUE_APP_DISTRO_HOST
        let distro
        try {
            //getting local distro version
            distro = require('../../distribution.json');
        } catch (ex) {
            console.log('distro.json not exists')
            return null
        }
        //getting remote distro version
        const response = await fetch(distroHost + 'distribution.json');
        const remoteDistro = await response.json();
        console.log(distro.version, remoteDistro.version)
        //comparing versions and starting update function if remote != local
        if (distro.version !== remoteDistro.version) {
            console.log('client download required')
            //passing a version # to a download url
            return remoteDistro.version
        } else if (remoteDistro == undefined) {
            return 'error'
        } else {
            console.log('client is up to date')
            return false
        }

    },

    updateClient: async(version) => {
        //downloading a client archive
        let distroHost = process.env.VUE_APP_DISTRO_HOST
        ipcRenderer.send('download progress',{
            status: true,
            percentage: 0,
            total: 0,
            stage: 'downloading'
        })
        ipcRenderer.send(
            'clientDownload', {
                url: distroHost + 'versions/' + version + '/client.zip',
                properties: { directory: os.tmpdir() }
        }
        )
        ipcRenderer.on("download complete", async (event, filePath) => {
            module.exports.sendUpdatedStatus( {
                status: true,
                percentage: 0,
                total: 0,
                stage: 'unpacking'
            })
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
            console.log('start unzip')
            var zip = new admZip(filePath)
            zip.extractAllTo("./client", true)

            //unziping complete, removing temp file
            console.log('finished unzip')
            module.exports.sendUpdatedStatus({
                status: false,
                percentage: 0,
                total: 0,
                stage: ''
            })
            fs.unlinkSync(filePath, console.log('temp file deleted'))
        })
    },

    sendUpdatedStatus: function (status) {
        console.log('hit', status)
        ipcRenderer.send('download progress', status)
    }
}