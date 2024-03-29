import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import Api from '../../helpers/api'
export default ({
	state: {
		wiki:{
            categories:[],
            category:{},
            posts:[],
            post:{}
        },
		news:{
            posts:[],
            post:{},
        }
	},
	actions: {
		async getNewsPosts(ctx){
            await Api().get(process.env.VUE_APP_WEB_API_GATE+'api/news')
            .then(response => {
                ctx.commit('setNewsPosts',response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
		getWikiCategories: async function({commit}){
			let categories = await Api().get(process.env.VUE_APP_WEB_API_GATE+'api/wiki-categories')
			.then(response => {
				return response.data
			})
			commit('setWikiCategories',categories)
		},
		getWikiPosts: async function({commit},id) {
			let posts = await Api().get(process.env.VUE_APP_WEB_API_GATE+'api/wiki-posts',{params:{category:id}})
			.then(response => {
				return response.data
			})
			commit('setWikiPosts',posts)
		},
		getWikiPost: async function({commit},id) {
            let post = await Api().get(process.env.VUE_APP_WEB_API_GATE+'api/wiki-post/'+id)
			.then(response => {
				return response.data
			})
            commit('setWikiPost',post)
        },
	},
	mutations: {
		setNewsPosts: function(state,posts){
            state.news.posts = posts
        },
		setWikiCategories: function(state,categories) {
			state.wiki.categories = categories
		},
		setWikiPosts: function(state,posts) {
			state.wiki.posts = posts
		},
		setWikiPost: function(state,post) {
			state.wiki.post = post
		}
	},
	getters:{
		newsPosts(state) {
			return state.news.posts
		},
		wikiCategories(state) {
			return state.wiki.categories
		},
		wikiPosts(state) {
			return state.wiki.posts
		},
		wikiPost(state) {
			return state.wiki.post
		}
	}
})