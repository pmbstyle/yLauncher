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
        }
	},
	actions: {
		getWikiCategories: async function({commit}){
			let categories = await Api().get(process.env.VUE_APP_WEB_API_GATE+'wiki-categories')
			.then(response => {
				return response.data
			})
			commit('setWikiCategories',categories)
		},
	},
	mutations: {
		setWikiCategories: function(state,categories) {
			state.wiki.categories = categories
		}
	},
	getters:{
		wikiCategories(state) {
			return state.wiki.categories
		}
	}
})