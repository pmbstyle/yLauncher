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
				<debug v-if="preferences.debug != 'false' && uiStatus.showDebug"/>
				<div id="main_row" v-if="mainmenu[0].is_active">
					<news/>
					<div>
						<server-status/>
						<vote/>
					</div>
				</div>
				<settings v-if="mainmenu[2].is_active"/>
				<wiki v-if="mainmenu[1].is_active"/>
			</div>
			<launch/>
			<div class="footer-copyright"><span>yLauncher alpha (Work in progress)</span> © 2021 EternalRPG</div>
		</div>
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'
import windowHeader from '../components/appheader.vue'
import launch from '../components/lunch.vue'
import debug from '../components/debug.vue'
import news from '../components/news.vue'
import serverStatus from '../components/server-status.vue'
import vote from '../components/vote.vue'
import settings from '../components/settings.vue'
import wiki from '../components/wiki.vue'
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
	name: 'Main',
	components: {
		launch,
		windowHeader,
		debug,
		news,
		serverStatus,
		vote,
		settings,
		wiki
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
		}
	},
	computed: {
		...mapGetters(['mainmenu','client','preferences','is_logged','user','uiStatus'])
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
