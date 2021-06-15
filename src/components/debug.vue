<template>
	<div class="debug-log">
		<vue-custom-scrollbar class="wrapper" id="debug" :settings="scrollSettings">
			<p v-for="(log, index) in activeLog" :key="index">
				<strong :class="{
					error:log.type === 'error',
					download:log.type === 'download',
					client:log.type === 'client'
				}">{{log.type}}:</strong>
				{{log.content}}
			</p>
		</vue-custom-scrollbar>
		<div class="debug-tabs">
			<div :class="{active:tab === t.id}" v-for="t in tabs" :key="t.id" @click="switchTab(t.id)">{{t.name}}</div>
		</div>
	</div>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default {
	name:'debug',
	components: {
		vueCustomScrollbar
	},
	data: function() {
		return {
			scrollSettings: {
				suppressScrollX: true
			},
			tab:0,
			tabs:[
				{id:0,name:'All'},
				{id:1,name:'Download'},
				{id:2,name:'Client'},
				{id:3,name:'Error'}
			]
		}
	},
	watch: {
		//stick debug log content to the bottom
		'client.log': function() {
			var elem = document.getElementById('debug');
			elem.scrollTop = elem.scrollHeight;
		}
	},
	computed: {
		...mapGetters(['client']),
		activeLog: function() {
			let log = []
			switch (this.tab) {
				case 0:
					log = this.client.log
					break;
				case 1:
					log = this.client.log.filter(log => log.type === 'download')
					break;
				case 2:
					log = this.client.log.filter(log => log.type === 'client')
					break;
				case 3:
					log = this.client.log.filter(log => log.type === 'error')
					break;
				default:
					log = this.client.log
					break;
			}
			return log
		}
	},
	methods: {
		...mapActions([]),
		...mapMutations([]),
		switchTab: function(id) {
			this.tab = id
			this.$nextTick(() => {
				var elem = document.getElementById('debug');
				elem.scrollTop = elem.scrollHeight;
			})
		}
	}
}
</script>
