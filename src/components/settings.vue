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
					<label>{{$ml.get('debugSetting')}}</label>
					<select name="debug" id="debug" v-model="debug">
						<option value="true" :selected="debug == true">{{$ml.get('on')}}</option>
						<option value="false" :selected="debug == false">{{$ml.get('off')}}</option>
					</select>
				</div>
			</div>
			<div class="right">
				<h2>{{$ml.get('clientOptions')}}</h2>
				<div class="settings-input">
					<label>{{$ml.get('minRam')}}</label>
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
					<label>{{$ml.get('maxRam')}}</label>
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
					<label>{{$ml.get('clientWidth')}}</label>
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
					<label>{{$ml.get('clientHeight')}}</label>
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
				debug:this.debug
			})
			this.savePreferences({
				lang:this.lang,
				debug:this.debug
			})
			writeLog('Settings saved: ' + JSON.stringify({
				minRam:this.minRam,
				maxRam:this.maxRam,
				debug:this.debug,
				lang:this.lang
			}))
		}
	}
}
</script>
