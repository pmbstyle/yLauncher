<template>
    <button
        class="play-btn"
        :class="uiStatus.playButton"
        @click="uiStatus.playButton == 'play' ? play() : ''"
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
            inProgress:false
        }
    },
    computed: {
		...mapGetters(['client','user', 'uiStatus', 'preferences']),
        playBtnText: function() {
            switch (this.uiStatus.playButton) {
                case 'play':
                    return this.preferences.lang == 'en' ? 'Play' : 'Играть'
                case 'playing':
                    return this.preferences.lang == 'en' ? 'Playing' : 'Играем'
                case 'launching':
                    return this.preferences.lang == 'en' ? 'Launching' : 'Запускаем'
                default:
                    return this.preferences.lang == 'en' ? 'Play' : 'Играть'
            }
        },
	},
    mounted: function() {
        this.clientManager()
    },
    methods: {
		...mapActions([]),
		...mapMutations(['pushLog','clearLog', 'playBtnStatus','debugStatus']),
        clientManager: async function() {
            let distroStatus = await clientUpdater.checkForUpdates()
            console.log(distroStatus)
            switch(distroStatus) {
                case null:
                    console.log('local distro is not exists')
                    break
                case false:
                    console.log('client is up to date')
                    break
                default:
                    console.log('downloading a client')
                    clientUpdater.updateClient(distroStatus)
                    break
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
