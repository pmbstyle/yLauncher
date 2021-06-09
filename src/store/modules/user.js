import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
//import Api from '../../helpers/api'
export default ({
	state: {
		user:{
            auth:{
				access_token:"E4IMsdKdo6RqEf8wfScy8v89JzKg0X",
				expires_in:604800,
				refresh_token:"6M4KsSn5OF2vxmTmXkAqbj7lRAlqML",
				scope:"identify",
				token_type:"Bearer"
			},
			user:{
				id:"710077674223173772",
				username:"embri",
				avatar:"cbe69a3c3827c15cd7271800a7e7e34c",
				discriminator:"9244",
				public_flags:0,
				flags:0,
				locale:"ru",
				mfa_enabled:false
			},
			account:{
				discordID:"embri#9244",
				minecraftID:"embri"
			}
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