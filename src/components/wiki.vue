<template>
	<div id="wiki">
		<div class="wrapper">
			<div class="content">
				<div class="wiki-title">{{$ml.get('categories')}}</div>
				<div v-for="category in wikiCategories" :key="category.id" class="wiki-content-list">
					<p>{{category['name_'+preferences.lang]}}</p>
				</div>
			</div>
			<div class="right" v-if="current == 'Main'">
				<div class="wiki-title">Welcome to ytyaCraft Wiki</div>
				<p>Welcome msg placeholder</p>
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
			current:'Main'
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
