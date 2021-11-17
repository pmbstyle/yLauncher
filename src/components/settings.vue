<template>
	<div id="settings">
		<div class="wrapper">
			<div class="left">
				<h2>{{$ml.get('launcherOptions')}}</h2>
				<div class="settings-input">
					<label>{{$ml.get('language')}}</label>
					<select name="lang" id="lang" v-model="lang">
						<option value="en" :selected="lang == 'en'">{{$ml.get('english')}}</option>
						<option value="ru" :selected="lang == 'ru'">{{$ml.get('russian')}}</option>
					</select>
				</div>
				<div class="settings-input">
					<label>
						{{$ml.get('debugSetting')}}
						<svg v-tooltip="{content:'Show debug log on client launch'}" enable-background="new 0 0 85 85" height="15px" version="1.1" viewBox="0 0 85 85" width="15px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<path d="M42.5,0.003C19.028,0.003,0,19.031,0,42.503s19.028,42.5,42.5,42.5S85,65.976,85,42.503S65.972,0.003,42.5,0.003z   M42.288,66.27c0,0-1.972,1.311-3.32,1.305c-0.12,0.055-0.191,0.087-0.191,0.087l0.003-0.087c-0.283-0.013-0.568-0.053-0.855-0.125  l-0.426-0.105c-2.354-0.584-3.6-2.918-3.014-5.271l3.277-13.211l1.479-5.967c1.376-5.54-4.363,1.178-5.54-1.374  c-0.777-1.687,4.464-5.227,8.293-7.896c0,0,1.97-1.309,3.319-1.304c0.121-0.056,0.192-0.087,0.192-0.087l-0.005,0.087  c0.285,0.013,0.57,0.053,0.857,0.124l0.426,0.106c2.354,0.584,3.788,2.965,3.204,5.318l-3.276,13.212l-1.482,5.967  c-1.374,5.54,4.27-1.204,5.446,1.351C51.452,60.085,46.116,63.601,42.288,66.27z M50.594,24.976  c-0.818,3.295-4.152,5.304-7.446,4.486c-3.296-0.818-5.305-4.151-4.487-7.447c0.818-3.296,4.152-5.304,7.446-4.486  C49.403,18.346,51.411,21.68,50.594,24.976z"/>
						</svg>
					</label>
					<select name="debug" id="debug" v-model="debug">
						<option value="true" :selected="debug == true">{{$ml.get('on')}}</option>
						<option value="false" :selected="debug == false">{{$ml.get('off')}}</option>
					</select>
				</div>
			</div>
			<div class="right">
				<h2>{{$ml.get('clientOptions')}}</h2>
				<div class="settings-input">
					<label>
						{{$ml.get('minRam')}}
						<svg v-tooltip="{content:'The minimum amount of RAM<br/>that Minecraft client allowed to use', html: true}" enable-background="new 0 0 85 85" height="15px" version="1.1" viewBox="0 0 85 85" width="15px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<path d="M42.5,0.003C19.028,0.003,0,19.031,0,42.503s19.028,42.5,42.5,42.5S85,65.976,85,42.503S65.972,0.003,42.5,0.003z   M42.288,66.27c0,0-1.972,1.311-3.32,1.305c-0.12,0.055-0.191,0.087-0.191,0.087l0.003-0.087c-0.283-0.013-0.568-0.053-0.855-0.125  l-0.426-0.105c-2.354-0.584-3.6-2.918-3.014-5.271l3.277-13.211l1.479-5.967c1.376-5.54-4.363,1.178-5.54-1.374  c-0.777-1.687,4.464-5.227,8.293-7.896c0,0,1.97-1.309,3.319-1.304c0.121-0.056,0.192-0.087,0.192-0.087l-0.005,0.087  c0.285,0.013,0.57,0.053,0.857,0.124l0.426,0.106c2.354,0.584,3.788,2.965,3.204,5.318l-3.276,13.212l-1.482,5.967  c-1.374,5.54,4.27-1.204,5.446,1.351C51.452,60.085,46.116,63.601,42.288,66.27z M50.594,24.976  c-0.818,3.295-4.152,5.304-7.446,4.486c-3.296-0.818-5.305-4.151-4.487-7.447c0.818-3.296,4.152-5.304,7.446-4.486  C49.403,18.346,51.411,21.68,50.594,24.976z"/>
						</svg>
					</label>
					<vue-range-slider
						ref="sliderMin"
						v-model="minRam"
						:formatter="formatter"
						:min="500"
						:max="6000"
						:width="330"
						:step="500">
					</vue-range-slider>
				</div>
				<div class="settings-input">
					<label>
						{{$ml.get('maxRam')}}
						<svg v-tooltip="{content:'The maximum amount of RAM<br/>that Minecraft client allowed to use', html: true}" enable-background="new 0 0 85 85" height="15px" version="1.1" viewBox="0 0 85 85" width="15px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<path d="M42.5,0.003C19.028,0.003,0,19.031,0,42.503s19.028,42.5,42.5,42.5S85,65.976,85,42.503S65.972,0.003,42.5,0.003z   M42.288,66.27c0,0-1.972,1.311-3.32,1.305c-0.12,0.055-0.191,0.087-0.191,0.087l0.003-0.087c-0.283-0.013-0.568-0.053-0.855-0.125  l-0.426-0.105c-2.354-0.584-3.6-2.918-3.014-5.271l3.277-13.211l1.479-5.967c1.376-5.54-4.363,1.178-5.54-1.374  c-0.777-1.687,4.464-5.227,8.293-7.896c0,0,1.97-1.309,3.319-1.304c0.121-0.056,0.192-0.087,0.192-0.087l-0.005,0.087  c0.285,0.013,0.57,0.053,0.857,0.124l0.426,0.106c2.354,0.584,3.788,2.965,3.204,5.318l-3.276,13.212l-1.482,5.967  c-1.374,5.54,4.27-1.204,5.446,1.351C51.452,60.085,46.116,63.601,42.288,66.27z M50.594,24.976  c-0.818,3.295-4.152,5.304-7.446,4.486c-3.296-0.818-5.305-4.151-4.487-7.447c0.818-3.296,4.152-5.304,7.446-4.486  C49.403,18.346,51.411,21.68,50.594,24.976z"/>
						</svg>
					</label>
					<vue-range-slider
						ref="sliderMax"
						v-model="maxRam"
						:formatter="formatter"
						:min="minRam"
						:max="8000"
						:width="330"
						:step="500">
					</vue-range-slider>
				</div>
				<div class="settings-input">
					<label>
						{{$ml.get('clientWidth')}}
						<svg v-tooltip="{content:'The width of initial client window', html: true}" enable-background="new 0 0 85 85" height="15px" version="1.1" viewBox="0 0 85 85" width="15px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<path d="M42.5,0.003C19.028,0.003,0,19.031,0,42.503s19.028,42.5,42.5,42.5S85,65.976,85,42.503S65.972,0.003,42.5,0.003z   M42.288,66.27c0,0-1.972,1.311-3.32,1.305c-0.12,0.055-0.191,0.087-0.191,0.087l0.003-0.087c-0.283-0.013-0.568-0.053-0.855-0.125  l-0.426-0.105c-2.354-0.584-3.6-2.918-3.014-5.271l3.277-13.211l1.479-5.967c1.376-5.54-4.363,1.178-5.54-1.374  c-0.777-1.687,4.464-5.227,8.293-7.896c0,0,1.97-1.309,3.319-1.304c0.121-0.056,0.192-0.087,0.192-0.087l-0.005,0.087  c0.285,0.013,0.57,0.053,0.857,0.124l0.426,0.106c2.354,0.584,3.788,2.965,3.204,5.318l-3.276,13.212l-1.482,5.967  c-1.374,5.54,4.27-1.204,5.446,1.351C51.452,60.085,46.116,63.601,42.288,66.27z M50.594,24.976  c-0.818,3.295-4.152,5.304-7.446,4.486c-3.296-0.818-5.305-4.151-4.487-7.447c0.818-3.296,4.152-5.304,7.446-4.486  C49.403,18.346,51.411,21.68,50.594,24.976z"/>
						</svg>
					</label>
					<vue-range-slider
						ref="sliderMax"
						v-model="width"
						:formatter="formatter2"
						:min="400"
						:max="2000"
						:width="330"
						:step="10">
					</vue-range-slider>
				</div>
				<div class="settings-input">
					<label>
						{{$ml.get('clientHeight')}}
						<svg v-tooltip="{content:'The height of initial client window', html: true}" enable-background="new 0 0 85 85" height="15px" version="1.1" viewBox="0 0 85 85" width="15px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<path d="M42.5,0.003C19.028,0.003,0,19.031,0,42.503s19.028,42.5,42.5,42.5S85,65.976,85,42.503S65.972,0.003,42.5,0.003z   M42.288,66.27c0,0-1.972,1.311-3.32,1.305c-0.12,0.055-0.191,0.087-0.191,0.087l0.003-0.087c-0.283-0.013-0.568-0.053-0.855-0.125  l-0.426-0.105c-2.354-0.584-3.6-2.918-3.014-5.271l3.277-13.211l1.479-5.967c1.376-5.54-4.363,1.178-5.54-1.374  c-0.777-1.687,4.464-5.227,8.293-7.896c0,0,1.97-1.309,3.319-1.304c0.121-0.056,0.192-0.087,0.192-0.087l-0.005,0.087  c0.285,0.013,0.57,0.053,0.857,0.124l0.426,0.106c2.354,0.584,3.788,2.965,3.204,5.318l-3.276,13.212l-1.482,5.967  c-1.374,5.54,4.27-1.204,5.446,1.351C51.452,60.085,46.116,63.601,42.288,66.27z M50.594,24.976  c-0.818,3.295-4.152,5.304-7.446,4.486c-3.296-0.818-5.305-4.151-4.487-7.447c0.818-3.296,4.152-5.304,7.446-4.486  C49.403,18.346,51.411,21.68,50.594,24.976z"/>
						</svg>
					</label>
					<vue-range-slider
						ref="sliderMax"
						v-model="height"
						:formatter="formatter2"
						:min="400"
						:max="2000"
						:width="330"
						:step="10">
					</vue-range-slider>
				</div>
				<div class="settings-input">
					<button class="save-settings" @click="saveSettings()">{{$ml.get('save')}}</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import 'vue-range-component/dist/vue-range-slider.css'
import VueRangeSlider from 'vue-range-component'
import { writeLog } from '../services/log-manager'
export default {
	name:'settings',
	data: function() {
		return {
			minRam:0,
			maxRam:0,
			width:800,
			height:600,
			debug:true,
			lang:'',
			formatter: null,
			formatter2: null
		}
	},
	components: {
		VueRangeSlider
	},
	computed: {
		...mapGetters(['client', 'preferences']),
	},
	mounted: function (){
		this.minRam = this.client.settings.minRam
		this.maxRam = this.client.settings.maxRam
		this.width = this.client.settings.width
		this.height = this.client.settings.height
		this.debug = this.preferences.debug
		this.lang = this.preferences.lang
		this.formatter = value => `${value} Mb`
		this.formatter2 = value => `${value} px`
	},
	methods: {
		...mapActions([]),
		...mapMutations(['saveClientSettings','savePreferences']),
		saveSettings: function() {
			this.saveClientSettings({
				minRam:this.minRam,
				maxRam:this.maxRam,
				width:this.width,
				heigh:this.height,
				debug:this.debug
			})
			this.savePreferences({
				lang:this.lang,
				debug:this.debug
			})
			writeLog('Settings saved: ' + JSON.stringify({
				minRam:this.minRam,
				maxRam:this.maxRam,
				width:this.width,
				heigh:this.height,
				debug:this.debug,
				lang:this.lang
			}))
		}
	}
}
</script>
