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
import {ipcRenderer} from 'electron'
const { Client, Authenticator } = require('minecraft-launcher-core')
import {mapGetters, mapActions, mapMutations} from 'vuex'
const admZip = require('adm-zip')
const fs = require('fs')
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
        this.downloadClient()
    },
    methods: {
		...mapActions([]),
		...mapMutations(['pushLog','clearLog', 'playBtnStatus','debugStatus']),
        downloadClient: function() {
            ipcRenderer.send(
				'clientDownload',{
                url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip",
                properties: {directory: "./tmp"}}
			)
            ipcRenderer.on("download progress", (event, progress) => {
                console.log(progress); // Progress in fraction, between 0 and 1
                //const progressInPercentages = progress * 100; // With decimal point and a bunch of numbers
                //const cleanProgressInPercentages = Math.floor(progress * 100); // Without decimal point
            }) 
            ipcRenderer.on("download complete", (event, path) => {
                console.log(path);
                var zip = new admZip(path);
                console.log('start unzip');
                zip.extractAllTo("./client", true);
                //zip.extractEntryTo('./client', './client', false, true);
                console.log('finished unzip');
                fs.unlinkSync(path,console.log('temp file deleted'));
            })     
        },
		play: function() {
            this.clearLog()
            let opts = {
                clientPackage: null,
                authorization: Authenticator.getAuth(this.user.account.minecraftID),
                root: ".ylauncher/",
                version: {
                    number: "1.16.5",
                    type: "release",
                },
                forge: './forge/forge-1.16.5-36.1.31-installer.jar',
                server:{
                    host:"mc.ytyacraft.ru"
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
                this.debugStatus(false)
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
            launcher.on('error', (e) => this.pushLog({type:'error', content:e.toString('utf-8')}))
		}
	}
}
</script>
