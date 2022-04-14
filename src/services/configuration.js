const fs = require('fs')
import store from '@/store/index'
import { writeLog } from '../services/log-manager'

const getConfiguration = async () => {

    let config = ''

    try {
        config = require('../../configuration.json')
    } catch (ex) {

        writeLog('Configuration.json not exists, creating a default config.')
        
        let prefs = store.getters.preferences
        let client = store.getters.clientSettings
        config = {prefs,client}

        fs.appendFile('./configuration.json', JSON.stringify(config), function (err) {
            if (err) throw err
        })
    }
    store.commit('saveClientSettings', config.client)
    store.commit('savePreferences', config.prefs)
    writeLog('Configuration has been restored form local configuration.json file.')

    return true

}

const saveConfiguration = async () => {
    let prefs = store.getters.preferences
    let client = store.getters.clientSettings
    let config = {prefs,client}

    fs.writeFile('./configuration.json', JSON.stringify(config), function (err) {
        if (err) throw err
    })

    writeLog('Configuration.json was updated.')

    return true
}
export {
    getConfiguration,
    saveConfiguration
}