<template>
    <button
        class="play-btn"
        :class="uiStatus.playButton"
        @click="buttonAction()"
        :disabled="inProgress"
    >
    {{playBtnText}}
    </button>
</template>
<script>
const { Client } = require('minecraft-launcher-core')
import {mapGetters, mapActions, mapMutations} from 'vuex'
import { checkForUpdates, updateClient, checkForJavaUpdates, updateDistro } from '@/services/client-updater'
import { writeLog } from '../services/log-manager'
export default {
    name:'launch',
    data: function() {
        return {
            distroStatus:'',
            javaStatus:'',
            javaChecked: false,
            distroSaved: false,
            inProgress:true
        }
    },
    computed: {
		...mapGetters(['client','user', 'uiStatus', 'preferences']),
        playBtnText: function() {
            switch (this.uiStatus.playButton) {
                case 'install':
                    return this.preferences.lang == 'en' ? 'Install' : 'Установка'
                case 'update':
                    return this.preferences.lang == 'en' ? 'Update' : 'Обновление'
                case 'updating':
                    return this.preferences.lang == 'en' ? 'Updating' : 'Обновляем'
                case 'play':
                    this.updateDownload({
                        status: false,
                        percentage: 0,
                        total: 0,
                        stage: ''
                    })
                    !this.javaChecked ? this.javaManager() : ''
                    !this.distroSaved ? updateDistro() : ''
                    return this.preferences.lang == 'en' ? 'Play' : 'Играть'
                case 'playing':
                    return this.preferences.lang == 'en' ? 'Playing' : 'Играем'
                case 'launching':
                    return this.preferences.lang == 'en' ? 'Launching' : 'Запускаем'
                case 'error':
                    return this.preferences.lang == 'en' ? 'Error' : 'Ошибка'
                default:
                    return this.preferences.lang == 'en' ? 'Play' : 'Играть'
            }
        },
	},
    mounted: async function() {
        await this.clientManager()
        this.inProgress = false
    },
    methods: {
		...mapActions([]),
		...mapMutations(['pushLog','clearLog','playBtnStatus','debugStatus','updateDownload']),
        clientManager: async function() {
            this.distroStatus = await checkForUpdates()
            switch(this.distroStatus) {
                case null:
                    writeLog('Local distro is not exists')
                    this.playBtnStatus('install')
                    break
                case false:
                    writeLog('Client is up to date')
                    this.playBtnStatus('play')
                    break
                case 'error':
                    writeLog('Error while updating')
                    this.playBtnStatus('error')
                    break
                default:
                    writeLog('Ready to download a client')
                    this.playBtnStatus('update')
                    break
            }
        },
        javaManager: async function() {
            this.javaChecked = true
            this.javaStatus = await checkForJavaUpdates()
            switch(this.javaStatus) {
                case false:
                    writeLog('Java is up to date')
                    this.playBtnStatus('play')
                    break
                case 'error':
                    writeLog('Error while updating')
                    this.playBtnStatus('error')
                    break
                default:
                    writeLog('Ready to download java')
                    this.playBtnStatus('updating')
                    break
            }
        },
        buttonAction: function() {
            switch(this.uiStatus.playButton) {
                case 'update':
                    updateClient(this.distroStatus)
                    break
                case 'play':
                    this.play()
                    break
                case 'playing':
                    break
                case 'launching':
                    break
                default:
                    return false
            }
        },
		play: function() {
            this.clearLog()

            let javaPath = process.env.VUE_APP_MODE == 'dev' ? 'C:/Code/ylauncher/java/jdk-17+35/bin/javaw.exe' : __dirname+'/java/jdk-17+35/bin/javaw.exe'
            writeLog(process.env.VUE_APP_MODE)
            writeLog(javaPath)
            let opts = {
                clientPackage: null,
                authorization: {
                    access_token: this.user.auth.token,
                    client_token: this.user.auth.token,
                    uuid: this.user.user.uuid,
                    name: this.user.user.name,
                    user_properties: '{}',
                    meta: {
                        type: 'msa'
                    }
                },
                root: 'client/',
                version: {
                    number: '1.17.1',
                    type: 'release'
                },
                javaPath: javaPath,
                server:{
                    host:"localhost"
                },
                memory: {
                    max: this.client.settings.maxRam,
                    min: this.client.settings.minRam
                },
                window: {
                    width: this.client.settings.width,
                    height: this.client.settings.height
                }
            }

            const launcher = new Client()
            launcher.launch(opts)

            launcher.on('close', () => {
                writeLog(JSON.stringify({type:'client', content:'The client sent close callback'}))
                this.pushLog({type:'client', content:'The client sent close callback'})
                this.playBtnStatus('play')
                this.debugStatus(false)
            })
            launcher.on('progress', (e) => {
                writeLog(JSON.stringify({type:'download', content:e}))
                this.pushLog({type:'download', content:e})
                this.playBtnStatus('launching')
                this.debugStatus(true)
            })
            launcher.on('data', (e) => {
                e.indexOf('[CHAT]') === -1 ? this.pushLog({type:'client', content:e}) : ''
                this.playBtnStatus('playing')
            })
            launcher.on('error', (e) => {
                writeLog(JSON.stringify({type:'error', content:e.toString('utf-8')}))
                this.pushLog({type:'error', content:e.toString('utf-8')})
                this.playBtnStatus('play')
            })
		}
	}
}
</script>
