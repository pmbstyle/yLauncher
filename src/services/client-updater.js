const { ipcRenderer } = require('electron')
const admZip = require('adm-zip')
const fs = require('fs')
const os = require('os')
import store from '@/store/index'

const checkForUpdates = async () => {
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

}

const updateClient = async (version) => {
    //downloading a client archive
    let distroHost = process.env.VUE_APP_DISTRO_HOST
    store.commit('updateDownload', {
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
        let path = filePath
        store.commit('updateDownload', {
            status: true,
            percentage: 100,
            total: 0,
            stage: 'unpacking'
        })
        
        //client downloaded to a temp folder
        console.log('preparing a dir')

        //removing client folder and recreating it
        fs.rmdirSync('./client', { recursive: true })
        if (!fs.existsSync('./client')) {
            fs.mkdirSync('./client');
        }
        console.log('done preparing a dir')

        //unziping a client to it's folder
        console.log('start unzip')
        setTimeout(() => { //waiting 2s to let ui update status
            var zip = new admZip(path)
            zip.extractAllTo("./client", true)

            //unziping complete, removing temp file
            console.log('finished unzip')
            fs.unlinkSync(path,
                store.commit('updateDownload', {
                    status: true,
                    percentage: 0,
                    total: 0,
                    stage: ''
                })
            )
        }, 2000)
    })
}

export {
    checkForUpdates,
    updateClient
}