<template>
	<div id="news">
		<vue-custom-scrollbar :settings="scrollSettings" class="wrapper">
			<div>
				<div class="news" v-for="item in posts" :key="item.id">
					<div class="image">
						<div class="wrapper">
							<img :src="getImageLink(item.image)" alt="">
						</div>
						<p class="date">{{item.date}}</p>
					</div>
					<div class="content">
						<a href="#" @click="showFull(item.id)">
							<h2>{{preferences.lang == 'en' ? item.title_en : item.title_ru}}</h2>
						</a>
						<div class="desc" v-html="preferences.lang == 'en' ? item.description_en : item.description_ru"></div>
						<a href="#" @click="showFull(item.id)">
							{{$ml.get('readMore')}}
						</a>
					</div>
				</div>
			</div>
		</vue-custom-scrollbar>
		<div class="fulltext" v-if="newsShown">
			<div class="window-content">
				<div class="close" @click="hideFull()">
					<div class="close-wrap">
						<div class="close-ico"></div>
					</div>
				</div>
				<vue-custom-scrollbar :settings="scrollSettings">
					<div class="body" v-html="fullContent">
						{{fullContent}}
					</div>
				</vue-custom-scrollbar>
			</div>
		</div>
	</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import moment from 'moment'
export default {
	name:'news',
	components: {
		vueCustomScrollbar
	},
	data: function() {
		return {
			posts:[],
			scrollSettings: {
				suppressScrollX: true
			},
			fullNews:null,
			newsShown:false,
			inProgress:false
		}
	},
	computed: {
		...mapGetters(['preferences','newsPosts']),
		fullContent: function() {
			let content = ''
			if(this.fullNews != null) {
				this.posts.map(item => {
					if(item.id == this.fullNews) {
						content = this.preferences.lang == 'en' ? `<div class="content">${item.full_text_en}</div>` : `<div class="content">${item.full_text_ru}</div>`
						let title = this.preferences.lang == 'en' ? `<h2>${item.title_en}</h2>` : `<h2>${item.title_ru}</h2>`
						let date = `<div class='date'>${item.date}</div>`
						let img = `<div class='img-wrapper' style='background-image:url(${process.env.VUE_APP_WEB_API_GATE}${item.image})'>${date}${title}</div>`
						content = img+content
					}
				})
			}
			return content
		}
	},
	mounted: async function (){
		await this.getNewsPosts()
		this.setPosts()
	},
	methods: {
		...mapActions(['getNewsPosts']),
		setPosts: function(){
			this.newsPosts.data.forEach(post => {
				let p = post
				p.date = moment(String(p.created_at)).format('MM/DD/YYYY')
				this.posts.push(p)
			})
		},
		showFull: function(id) {
			this.fullNews = id
			this.newsShown = true
		},
		hideFull: function() {
			this.fullNews = null
			this.newsShown = false
		},
		getImageLink: function(image) {
			return process.env.VUE_APP_WEB_API_GATE+image
		}
	}
}
</script>
