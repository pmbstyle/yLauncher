const { ipcRenderer } = require('electron')
const admZip = require('adm-zip')
const fs = require('fs')
const os = require('os')
import store from '@/store/index'
import { writeLog } from '../services/log-manager'

const distroHost = process.env.VUE_APP_DISTRO_HOST

const checkForUpdates = async () => {

    let distro = ''
    try {
        //getting local distro version
        distro = require('../../distribution.json');
    } catch (ex) {
        writeLog('distro.json not exists')
        console.log('distro.json not exists')
        return null
    }
    //getting remote distro version
    let response = await fetch(distroHost + 'distribution.json', { cache: "no-cache" })
    let remoteDistro = await response.json()
    writeLog('distro client version: ' + distro.version + '/' +remoteDistro.version)
    console.log(distro.version, remoteDistro.version)
    //comparing versions and starting update function if remote != local
    if (distro.version !== remoteDistro.version) {
        writeLog('client download required')
        console.log('client download required')
        //passing a version # to a download url
        return remoteDistro.version
    } else if (remoteDistro == undefined) {
        writeLog('error: remoteDistro == undefined')
        return 'error'
    } else {
        writeLog('client is up to date')
        console.log('client is up to date')
        return false
    }

}

const checkForJavaUpdates = async () => {

    let distro = ''
    try {
        //getting local distro version
        distro = require('../../distribution.json');
    } catch (ex) {
        writeLog('distro.json not exists')
        console.log('distro.json not exists')
    }
    //getting remote distro version
    let response = await fetch(distroHost + 'distribution.json', { cache: "no-cache" })
    let remoteDistro = await response.json()

    //comparing versions and starting update function if remote != local
    writeLog('java version: ' + distro.java_version + '/' + remoteDistro.java_version)
    console.log(distro.java_version, remoteDistro.java_version)
    //comparing versions and starting update function if remote != local
    if (distro.java_version !== remoteDistro.java_version) {
        writeLog('java download required')
        console.log('java download required')
        //passing a version # to a download url
        updateJava()
    } else if (remoteDistro == undefined) {
        writeLog('error: remoteDistro == undefined')
        return 'error'
    } else {
        writeLog('java is up to date')
        console.log('java is up to date')
        return false
    }

}

const updateClient = async (version) => {
    //downloading a client archive
    writeLog('downloading a client')
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
        writeLog('unpacking a client')
        let path = filePath
        store.commit('updateDownload', {
            status: true,
            percentage: 100,
            total: 0,
            stage: 'unpacking'
        })
        
        //client downloaded to a temp folder
        writeLog('preparing a dir')
        console.log('preparing a dir')

        //removing client folder and recreating it
        fs.rmdirSync('./client', { recursive: true })
        if (!fs.existsSync('./client')) {
            fs.mkdirSync('./client');
        }
        writeLog('done preparing a dir')
        console.log('done preparing a dir')

        //unziping a client to it's folder
        writeLog('start unzip')
        console.log('start unzip')
        setTimeout(() => { //waiting 2s to let ui update status
            var zip = new admZip(path)
            zip.extractAllTo("./client", true)

            //unziping complete, removing temp file
            writeLog('finished unzip')
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

const updateJava = async () => {
    //downloading a client archive
    writeLog('downloading java')
    store.commit('updateDownload', {
        status: true,
        percentage: 0,
        total: 0,
        stage: 'downloading'
    })

    ipcRenderer.send(
        'javaDownload', {
            url: distroHost + 'java/' + process.platform + '/java.zip',
        properties: { directory: os.tmpdir() }
    }
    )
    ipcRenderer.on("java download complete", async (event, filePath) => {
        let javapath = filePath
        store.commit('updateDownload', {
            status: true,
            percentage: 100,
            total: 0,
            stage: 'unpacking'
        })

        //java downloaded to a temp folder
        writeLog('preparing a java dir')
        console.log('preparing a java dir')

        //removing java folder and recreating it
        fs.rmdirSync('./java', { recursive: true })
        if (!fs.existsSync('./java')) {
            fs.mkdirSync('./java');
        }
        writeLog('done preparing a java dir')
        console.log('done preparing a dir')

        //unziping a java to it's folder
        writeLog('start unzip')
        console.log('start unzip')
        setTimeout(() => { //waiting 2s to let ui update status
            var zip = new admZip(javapath)
            zip.extractAllTo("./java", true)

            //unziping complete, removing temp file
            writeLog('finished unzip')
            console.log('finished unzip')
            fs.unlinkSync(javapath,
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

const updateDistro = async () => {
    writeLog('saving distro json')
    console.log('saving distro json')
    let response = await fetch(distroHost + 'distribution.json', { cache: "no-cache" })
    let remoteDistro = await response.json()
    fs.writeFileSync('./distribution.json', JSON.stringify(remoteDistro))
}

export {
    checkForUpdates,
    updateClient,
    checkForJavaUpdates,
    updateJava,
    updateDistro
}