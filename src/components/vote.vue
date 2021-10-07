<template>
	<div id="vote">
		<div class="wrapper">
			
		</div>
	</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
	name:'vote',
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
