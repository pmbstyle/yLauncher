<template>
	<div id="mainWrap">
		<div id="main">
			<div class="close" @click="close()">
				<div class="close-wrap">
					<div class="close-ico"></div>
				</div>
			</div>
			<div class="header">
				<div class="drag"></div>
				<div id="user">
					<div class="avatar" :style="{ 'background-image': 'url(' + userAvatar + ')' }"></div>
				</div>
			</div>
			<div class="wrapper"></div>
			<launch/>
			<div class="footer-copyright"><span>yLauncher alpha</span> © 2021 ytyaCraft</div>
		</div>
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'
import launch from '../components/lunch.vue'
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
	name: 'Main',
	components: {
		launch
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
		}
	},
	computed: {
		...mapGetters(['preferences','is_logged','user']),
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
