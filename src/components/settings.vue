<template>
	<div id="settings">
		<div class="settings-input">
            <label>Min Ram</label>
            <vue-range-slider ref="sliderMin" v-model="minRam" :min="500" :max="6000" :width="400"></vue-range-slider>
        </div>
		<div class="settings-input">
            <label>Max Ram</label>
            <vue-range-slider ref="sliderMax" v-model="maxRam" :min="1000" :max="8000" :width="400"></vue-range-slider>
        </div>
        <div class="settings-input">
            <button @click="saveSettings()">Save</button>
        </div>
	</div>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import 'vue-range-component/dist/vue-range-slider.css'
import VueRangeSlider from 'vue-range-component'
export default {
	name:'settings',
	data: function() {
		return {
			minRam:0,
            maxRam:0
		}
	},
    components: {
        VueRangeSlider
    },
	computed: {
		...mapGetters(['client']),
	},
    mounted: function (){
        this.minRam = this.client.settings.minRam
        this.maxRam = this.client.settings.maxRam
    },
	methods: {
		...mapActions([]),
		...mapMutations(['saveClientSettings']),
		saveSettings: function() {
            this.saveClientSettings({
                minRam:this.minRam,
                maxRam:this.maxRam
            })
        }
	}
}
</script>
