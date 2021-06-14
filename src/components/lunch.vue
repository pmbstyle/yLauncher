<template>
    <button class="play-btn" @click="!inProgress ? play() : ''">{{$ml.get('playBtn')}}</button>
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
	},
    methods: {
		...mapActions([]),
		...mapMutations(['pushLog']),
		play: function() {
            this.inProgress = true
            let opts = {
                clientPackage: null,
                authorization: Authenticator.getAuth(this.user.account.minecraftID),
                root: ".ylauncher/",
                version: {
                    number: "1.16.5",
                    type: "release",
                },
                server:{
                    host:"mc.ytyacraft.ru"
                },
                memory: {
                    max: "2000",
                    min: "1000"
                }
            }

            const launcher = new Client()
            launcher.launch(opts)

            // launcher.on('debug', (e) => {
            //     return new Promise(e => {
            //         api.on(e => resolve(e))
            //     })
            // })
            // launcher.on('download', (e) => console.log('download: '+e))
            // launcher.on('download-status', (e) => console.log('download-status: '+e.name+','+e.type+','+e.current+','+e.total))
            // launcher.on('progress', (e) => console.log('progress: '+e.total))
            launcher.on('data', (e) => this.pushLog(e.toString('utf-8')))
            // launcher.on('package-extract', (e) => console.log('package-extract: '+e.toString('utf-8')))
            // launcher.on('close', (e) => console.log('close: '+e.toString('utf-8')))
            // launcher.on('error', (e) => console.log(e.toString('utf-8')))
		}
	}
}
</script>
