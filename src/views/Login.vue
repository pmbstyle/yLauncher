<template>
	<div id="loginWrap">
		<div class="login" :class="{'in-progress':inProgress}">
			<div class="close" @click="close()">
				<div class="close-wrap">
					<div class="close-ico"></div>
				</div>
			</div>
			<div class="drag-wrap"></div>
            <div class="description">
				<div class="server-status">
					<div>
						<span>Lobby:</span>
						<span class="online"></span>
					</div>
					<div>
						<span>Eternal Arena:</span>
						<span class="online"></span>
					</div>
				</div>
				<video autoplay muted>
					<source src="videos/mc-intro.mp4" type="video/mp4">
				</video> 
			</div>
			<!-- <div class="description" :class="{error:loginError}">
				<template v-if="!loginError">{{$ml.get('loginDescription')}}</template>
				<template v-if="loginError">{{$ml.get('loginDescriptionError')}}</template>
			</div> -->
			<div class="form">
				<button class="login-btn" @click="!inProgress ? microsoftLogin() : ''">
					<span></span>{{$ml.get('microsoftLogin')}}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import Microsoft from '../services/microsoft'
import { createLog, writeLog } from '../services/log-manager'
export default {
	name: 'Login',
	data: function(){
		return {
			loginError:false,
			save:false,
			inProgress:false
		}
	},
	watch: {
		'preferences.lang': function(){
			this.$ml.change(this.preferences.lang)
			this.$forceUpdate()
		},
		'uiStatus.maintenance': function(){
			if(this.uiStatus.maintenance.status == 'on'){
				writeLog('Server maintenance reported.')
			}
		}
	},
	computed: {
		...mapGetters(['preferences','is_logged','user','uiStatus'])
	},
	mounted: async function () {
		this.uiSetLang(navigator.language)
		createLog()
		writeLog('Login screen init')
		this.checkMaintenance()
	},
	methods: {
		...mapMutations(['uiSetLang','setUser','setToken','setAccount']),
		...mapActions(['checkMaintenance']),
		close: function() {
			writeLog('Session terminated')
			ipcRenderer.send('window-close')
		},
		microsoftLogin: function() {
			var client_id = process.env.VUE_APP_AZURE_CLIENT_ID
			var redirect_uri = process.env.VUE_APP_MICROSOFT_REDIRECT
			var scopes = encodeURIComponent('XboxLive.signin offline_access')
			ipcRenderer.send(
				'startMicrosoftAuth',
				`https://login.live.com/oauth20_authorize.srf?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scopes}`
			)
			ipcRenderer.once('microsoftAuthSuccess', async (_event, code) => {
				try {
					const result = await Microsoft.authFromCode(code)
					if (result.errorCode !== undefined) {
						switch (result.errorCode) {
							case 'notOwnMinecraft':
								writeLog(result.error)
								throw new Error(result.error)

							default:
								writeLog(result.error)
								throw new Error(result.error)
						}
					} else {
						this.setUser({
							name:result.name,
							uuid:result.uuid,
							type:'microsoft'
						})
						this.setToken({
							token:result.token,
							refresh_token:result.refreshToken
						})
						writeLog('Signed In with MS account')
						this.$router.push('Main')
					}
				} catch (error) {
					writeLog(error)
					this.inProgress = false
					this.loginError = true
				}
			})
			ipcRenderer.once('microsoftAuthCancelled', () => {
				writeLog('Login flow canceled')
				this.inProgress = false
				this.loginError = true
			})
		}
	}
}
</script>
