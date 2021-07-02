<template>
	<div id="wiki">
		<div class="wrapper">
			<div v-for="category in wikiCategories" :key="category.id">
                {{category['name_'+preferences.lang]}}
            </div>
		</div>
	</div>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
	name:'wiki',
	data: function() {
		return {
		}
	},
	computed: {
		...mapGetters(['preferences','wikiCategories']),
	},
	mounted: function (){
		this.getWikiCategories()
	},
	methods: {
		...mapActions(['getWikiCategories']),
		...mapMutations([]),
		
	}
}
</script>
