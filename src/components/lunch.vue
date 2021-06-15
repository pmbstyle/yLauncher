<template>
    <button
        class="play-btn"
        @click="!inProgress ? play() : ''"
        :disabled="inProgress"
    >
    {{playBtnText}}
    </button>
</template>
<script>
const { Client, Authenticator } = require('minecraft-launcher-core')
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
    name:'launch',
    data: function() {
        return {
            inProgress:false
        }
    },
    computed: {
		...mapGetters(['client','user']),
        playBtnText: function() {
            return !this.inProgress ? this.$ml.get('playBtn') : this.$ml.get('playingBtn')
        }
	},
    methods: {
		...mapActions([]),
		...mapMutations(['pushLog','clearLog']),
		play: function() {
            this.inProgress = true
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
                this.inProgress = false
            })
            launcher.on('progress', (e) => this.pushLog({type:'download', content:e}))
            launcher.on('data', (e) => e.indexOf('[CHAT]') === -1 ? this.pushLog({type:'client', content:e}) : '')
            launcher.on('error', (e) => this.pushLog({type:'error', content:e.toString('utf-8')}))
		}
	}
}
</script>
