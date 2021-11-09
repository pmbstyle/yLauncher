import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default ({
	state: {
		user:{
            auth:{},
			user:{}
        },
		is_logged:false
	},
	actions: {
		getDiscordUser: async function({commit,state}){
			let user = await fetch('https://discord.com/api/users/@me', {
                headers: {
                    authorization: `${state.user.auth.token_type} ${state.user.auth.access_token}`,
                },
            })
			.then(response => {
				return response.json()
			})
			commit('setUser',user)
		},
	},
	mutations: {
		setToken: function(state,auth) {
			state.user.auth = auth
		},
		setUser: function(state,user) {
			state.user.user = user
		},
        setAccount: function(state,profile) {
            state.user.account = profile
            state.is_logged = true
        }
	},
	getters:{
		is_logged(state) {
			return state.is_logged
		},
		user(state) {
			return state.user
		}

	}
})