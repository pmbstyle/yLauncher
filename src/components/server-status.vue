<template>
	<div id="server-status">
		<div class="wrapper">
			
		</div>
	</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
	name:'serverStatus',
	data: function() {
		return {
			inProgress:false
		}
	},
	computed: {
		...mapGetters(['preferences']),
	},
	mounted: function (){
		
	},
	methods: {
		...mapActions([]),
		
	}
}
</script>
