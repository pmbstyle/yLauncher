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
import clientUpdater from '@/services/client-updater'
export default {
    name:'launch',
    data: function() {
        return {
            distroStatus:'',
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
		...mapMutations(['pushLog','clearLog', 'playBtnStatus','debugStatus']),
        clientManager: async function() {
            this.distroStatus = await clientUpdater.checkForUpdates()
            switch(this.distroStatus) {
                case null:
                    console.log('local distro is not exists')
                    this.playBtnStatus('install')
                    break
                case false:
                    console.log('client is up to date')
                    this.playBtnStatus('play')
                    break
                case 'error':
                    console.log('error while updating')
                    this.playBtnStatus('play')
                    break
                default:
                    console.log('ready to download a client')
                    this.playBtnStatus('update')
                    break
            }
        },
        buttonAction: function() {
            switch(this.uiStatus.playButton) {
                case 'install':
                    clientUpdater.updateClient(this.distroStatus)
                    break
                case 'update':
                    clientUpdater.updateClient(this.distroStatus)
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
                javaPath: 'C:/Code/ylauncher/java/bin/javaw.exe',
                server:{
                    host:"localhost"
                },
                memory: {
                    max: this.client.settings.maxRam,
                    min: this.client.settings.minRam
                }
            }

            const launcher = new Client()
            launcher.launch(opts)

            launcher.on('close', () => {
                this.pushLog({type:'client', content:'The client sent close callback'})
                this.playBtnStatus('play')
                // this.debugStatus(false)
            })
            launcher.on('progress', (e) => {
                this.pushLog({type:'download', content:e})
                this.playBtnStatus('launching')
                this.debugStatus(true)
            })
            launcher.on('data', (e) => {
                e.indexOf('[CHAT]') === -1 ? this.pushLog({type:'client', content:e}) : ''
                this.playBtnStatus('playing')
            })
            launcher.on('error', (e) => {
                this.pushLog({type:'error', content:e.toString('utf-8')})
                this.playBtnStatus('play')
            })
		}
	}
}
</script>
