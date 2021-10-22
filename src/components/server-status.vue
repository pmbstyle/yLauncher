<template>
	<div id="server-status">
		<div class="wrapper">
			<div class="status-online">
				{{$ml.get('serverStatus')}}:
				<span :class="{'online':status,'offline':!status}">
				</span>
			</div>
			<div class="players-online">
				{{$ml.get('playersOnline')}}: <span>{{playersOnline}} / {{maxPlayers}}</span>
			</div>
		</div>
	</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import { writeLog } from '../services/log-manager'
export default {
	name:'serverStatus',
	data: function() {
		return {
			status:false,
			playersOnline:0,
			maxPlayers:0,
			inProgress:false
		}
	},
	computed: {
		...mapGetters(['preferences']),
	},
	mounted: function (){
		this.checkStatus()
	},
	methods: {
		...mapActions([]),
		checkStatus: function() {
			this.axios.get('https://mcapi.us/server/status?ip=mc.ytyacraft.ru').then(response => {
				this.status = response.data.online
				this.playersOnline = response.data.players.now
				this.maxPlayers = response.data.players.max
				writeLog('Server status recieved: '+response.data.players.now+'/'+response.data.players.max)
			})
		}
	}
}
</script>
