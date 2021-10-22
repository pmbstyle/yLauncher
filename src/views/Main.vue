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
			<download-status v-if="uiStatus.download.status"/>
			<div class="footer-copyright"><span>yLauncher alpha (Work in progress)</span> © 2021 Eternal RPG</div>
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
import downloadStatus from '../components/download.vue'
import {mapGetters, mapActions, mapMutations} from 'vuex'
import { writeLog } from '../services/log-manager'
export default {
	name: 'Main',
	components: {
		launch,
		downloadStatus,
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
		ipcRenderer.on("download progress", (event, progress) => {
			writeLog(JSON.stringify(
				{
					status:progress.status,
					percentage:Math.round(progress.percent*100),
					total:Math.round(progress.totalBytes / 1000000),
					stage: progress.stage
				}
			))
            //callback for client download
			this.updateDownload({
				status:progress.status,
				percentage:Math.round(progress.percent*100),
				total:Math.round(progress.totalBytes / 1000000),
				stage: progress.stage
			})
        })
	},
	methods: {
		...mapActions([]),
		...mapMutations(['uiSetLang','updateDownload']),
		close: function() {
			ipcRenderer.send('window-close')
		}
	}
}
</script>
