<template>
	<div id="mainWrap">
		<div id="main">
			<div class="close" @click="close()">
				<div class="close-wrap">
					<div class="close-ico"></div>
				</div>
			</div>
			<window-header/>
			<div class="wrapper">
				<div class="debug-log" id="debug">
					<p v-for="(log, index) in client.log" :key="index">
						<strong :class="{
							error:log.type === 'Error',
							download:log.type === 'Download Progress',
							client:log.type === 'Client Data'
						}">{{log.type}}:</strong>
						{{log.content}}
					</p>
				</div>
			</div>
			<launch/>
			<div class="footer-copyright"><span>yLauncher alpha</span> © 2021 ytyaCraft</div>
		</div>
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'
import windowHeader from '../components/header.vue'
import launch from '../components/lunch.vue'
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
	name: 'Main',
	components: {
		launch,
		windowHeader
	},
	data: function(){
		return {
			inProgress:false,
			log:[]
		}
	},
	watch: {
		'preferences.lang': function(){
			this.$ml.change(this.preferences.lang)
			this.$forceUpdate()
		},
		//stick debug log content to the bottom
		'client.log': function() {
			var elem = document.getElementById('debug');
			elem.scrollTop = elem.scrollHeight;
		}
	},
	computed: {
		...mapGetters(['client','preferences','is_logged','user']),
		userAvatar: function(){
			let url = `https://cdn.discordapp.com/avatars/${this.user.user.id}/${this.user.user.avatar}.png`
			return url
		}
	},
	mounted: async function () {
		this.uiSetLang(navigator.language)
		//setting up login window size
		ipcRenderer.send('main-window')
	},
	methods: {
		...mapActions([]),
		...mapMutations(['uiSetLang']),
		close: function() {
			ipcRenderer.send('window-close')
		}
	}
}
</script>
