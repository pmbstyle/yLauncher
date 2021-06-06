<template>
	<div id="loginWrap">
		<div class="login">
			<div class="close" @click="close()">
				<div class="close-wrap">
					<div class="close-ico"></div>
				</div>
			</div>
			<div class="header">YC Launcher<span>beta</span></div>
			<div class="description" :class="{error:loginError}">{{descMsg}}
				<p><button @click="loginDiscord()">Discord</button></p>
			</div>
			<div class="form">
				<input type="text" class="form-input" placeholder="Email" v-model="formUser.login">
				<input type="password" class="form-input" placeholder="Password" v-model="formUser.password">
				<div class="save-login checkbox" @click="save = !save">
					<div class="box" :class="{'active':save}"></div>
					<div class="title">Save email for next login</div>
				</div>
				<button class="login-btn" @click="login()">Login</button>
			</div>
		</div>
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
	name: 'Login',
	data: function(){
		return {
			descMsg: 'Sign in with your Mojang account',
			formUser: {
				login:'',
				password:''
			},
			loginError:false,
			save:false
		}
	},
	computed: {
		...mapGetters(['is_logged','user']),
	},
	mounted: function () {
		ipcRenderer.send('login-window')
		ipcRenderer.on('discord-oauth-reply', async (event, auth) => {
			this.setToken(auth)
			await this.getDiscordUser()
			ipcRenderer.send('check-discord-account', {
				username:this.user.user.username,
				discriminator:this.user.user.discriminator
			})
		})
		ipcRenderer.on('user-confirm', (event, profile) => {
			if(profile){
				this.setAccount(profile)
			} else {
				this.loginError = true
				this.descMsg = 'Access denied, invalid credentials'
			}		
		})
	},
	methods: {
		...mapActions(['getDiscordUser']),
		...mapMutations(['setToken','setAccount']),
		login: async function() {
			this.loginError = false
			let authpath = 'https://authserver.mojang.com/authenticate'
			let minecraftAgent = {
				name: 'Minecraft',
				version: 1
			}
			this.axios.post(authpath,{
				agent:minecraftAgent,
				username:this.formUser.login,
				password:this.formUser.password
			}).then((response)=> {
				this.setToken({accessToken:response.data.accessToken,clientToken:response.data.clientToken})
				ipcRenderer.send('check-mojang-account', response.data.selectedProfile.name)
			}).catch(() => {
				this.loginError = true
				this.descMsg = 'Access denied, invalid credentials'
			})
		},
		loginDiscord: function() {
			ipcRenderer.send('discord-oauth', 'getToken');
		},
		close: function() {
			ipcRenderer.send('window-close')
		}
	}
}
</script>
