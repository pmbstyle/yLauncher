<template>
	<div id="loginWrap">
		<div class="login" :class="{'in-progress':inProgress}">
			<div class="close" @click="close()">
				<div class="close-wrap">
					<div class="close-ico"></div>
				</div>
			</div>
			<div class="header">yLauncher<span>α</span></div>
			<div class="discord-auth" @click="loginDiscord()">
				<div class="discord-ico"></div>
				<div class="discord-title">{{$ml.get('discordLogin')}}</div>
			</div>
			<div class="description" :class="{error:loginError}">{{descriptionMsg}}</div>
			<div class="form">
				<input type="text" class="form-input" placeholder="Email" v-model="formUser.login">
				<input type="password" class="form-input" placeholder="Password" v-model="formUser.password">
				<div class="save-login checkbox" @click="save = !save">
					<div class="box" :class="{'active':save}"></div>
					<div class="title">{{$ml.get('saveLogin')}}</div>
				</div>
				<button class="login-btn" @click="!inProgress ? login() : ''">{{$ml.get('loginBtn')}}</button>
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
			formUser: {
				login:'',
				password:''
			},
			loginError:false,
			save:false,
			inProgress:false
		}
	},
	watch: {
		'preferences.lang': function(){
			this.$ml.change(this.preferences.lang)
			this.$forceUpdate()
		}
	},
	computed: {
		...mapGetters(['preferences','is_logged','user']),
		//showing error msg
		descriptionMsg: function(){
			return !this.loginError ? this.$ml.get('loginDescription') : this.$ml.get('loginDescriptionError')
		}
	},
	mounted: async function () {
		this.uiSetLang(navigator.language)
		//on discord/mojang auth set token and check if account whitelisted
		ipcRenderer.on('discord-oauth-reply', async (event, auth) => {
			this.setToken(auth)
			await this.getDiscordUser()
			ipcRenderer.send('check-discord-account', {
				username:this.user.user.username,
				discriminator:this.user.user.discriminator
			})
		})
		ipcRenderer.on('user-confirm', async (event, profile) => {
			if(profile){
				await this.setAccount(profile)
				this.$router.push('Main')
			} else {
				this.inProgress = false
				this.loginError = true
			}		
		})
	},
	methods: {
		...mapActions(['getDiscordUser']),
		...mapMutations(['uiSetLang','setToken','setAccount']),
		//mojan login
		login: async function() {
			this.inProgress = true
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
				this.inProgress = false
				this.loginError = true
			})
		},
		//discord login
		loginDiscord: function() {
			ipcRenderer.send('discord-oauth', 'getToken');
		},
		close: function() {
			ipcRenderer.send('window-close')
		}
	}
}
</script>
