<template>
	<div id="loginWrap">
		<div class="login">
			<div class="close" @click="close()">
				<div class="close-wrap">
					<div class="close-ico"></div>
				</div>
			</div>
			<div class="header">YC Launcher<span>beta</span></div>
			<div class="description" :class="{error:loginError}">{{descMsg}}</div>
			<div class="form">
				<input type="text" class="form-input" placeholder="Email" v-model="user.login">
				<input type="password" class="form-input" placeholder="Password" v-model="user.password">
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
export default {
	name: 'Login',
	data: function(){
		return {
			descMsg: 'Sign in with your Mojang account',
			user: {
				login:'',
				password:''
			},
			loginError:false,
			save:false
		}
	},
	mounted: function () {
		ipcRenderer.send('login-window') 
	},
	methods: {
		login: async function() {
		this.loginError = false
		let authpath = 'https://authserver.mojang.com/authenticate'
		let minecraftAgent = {
			name: 'Minecraft',
			version: 1
		}
		this.axios.post(authpath,{
			agent:minecraftAgent,
			username:this.user.login,
			password:this.user.password
		}).then((response)=> {
			console.log(response);
		}).catch(() => {
			this.loginError = true
			this.descMsg = 'Access denied, invalid credentials'
		})
		},
		close: function() {
			ipcRenderer.send('window-close')
		}
	}
}
</script>
