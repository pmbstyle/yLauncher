<template>
	<div id="download-progress">
		<div class="wrapper">
			<div class="status" :style="{'width':uiStatus.download.percentage}">
                <span>
                    {{downloadStatus}}
                </span>
            </div>
		</div>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
	name:'downloadStatus',
	computed: {
		...mapGetters(['preferences','uiStatus']),
        downloadStatus: function() {
            let status = ''
            if(this.uiStatus.download.stage == 'download') {
                status = this.uiStatus.download.percentage + '% ' + this.preferences.lang == 'en' ? 'of' : 'из' + this.uiStatus.download.total + 'Mb'
            } else if (this.uiStatus.download.stage == 'unpacking') {
                status = this.preferences.lang == 'en' ? 'installing' : 'устанавливаем'
            } else {
                status = ''
            }
            return status
        }
	},
	methods: {
	}
}
</script>
