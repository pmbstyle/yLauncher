<template>
	<div id="wiki">
		<div class="wrapper">
			<div class="left">
				<div class="wiki-title">
					<span>{{$ml.get('categories')}}</span>
				</div>
				<div class="content">
					<div @click="getPosts(category.id)" v-for="category in wikiCategories" :key="category.id" class="wiki-content-list">
						<p :class="{active:activeCategory == category.id}">{{category['name_'+preferences.lang]}}</p>
					</div>
				</div>
			</div>
			<div class="right">
				<perfect-scrollbar ref="scroll" v-if="!inProgress">
					<template v-if="current == 'Main'">
						<div class="wiki-welcome">
							<h2>Welcome to ytyaCraft Wiki</h2>
							<p>Welcome msg placeholder</p>
						</div>
					</template>
					<template v-if="current == 'Category'">
						<div class="wiki-posts">
							<div v-for="post in wikiPosts" :key="post.id" class="wiki-content-list">
								<p @click="getPost(post.id)">{{post['name_'+preferences.lang]}}</p>
							</div>
						</div>
					</template>
					<template v-if="current == 'Post'">
						<div class="wiki-post">
							<h1>{{wikiPost['name_'+preferences.lang]}}</h1>
							<div v-html="wikiPost['description_'+preferences.lang]"></div>
						</div>
					</template>
				</perfect-scrollbar>
			</div>
		</div>
	</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
	name:'wiki',
	data: function() {
		return {
			current:'Main',
			activeCategory:'',
			inProgress:false
		}
	},
	computed: {
		...mapGetters(['preferences','wikiCategories','wikiPosts','wikiPost']),
	},
	mounted: function (){
		this.getWikiCategories()
	},
	methods: {
		...mapActions(['getWikiCategories','getWikiPosts','getWikiPost']),
		getPosts: async function(id) {
			this.current = 'Category'
			this.activeCategory = id
			this.inProgress = true
			await this.getWikiPosts(id)
			this.inProgress = false
		},
		getPost: async function(id) {
			this.current = 'Post'
			this.inProgress = true
			await this.getWikiPost(id)
			this.inProgress = false
		}
	}
}
</script>
