<template>
	<div id="download-progress">
		<div class="wrapper">
			<div class="status" :style="{'width':uiStatus.download.percentage+'%'}">
                <span>
                    {{downloadStatus}}
                </span>
            </div>
		</div>
	</div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex'
export default {
	name:'downloadStatus',
	computed: {
		...mapGetters(['preferences','uiStatus']),
        downloadStatus: function() {
            let status = ''
            if(this.uiStatus.download.stage == 'downloading') {
                this.playBtnStatus('updating')
                let lng = this.preferences.lang == 'en' ? ' of ' : ' из '
                status = this.uiStatus.download.percentage + '% ' + lng + this.uiStatus.download.total + 'Mb'
            } else if (this.uiStatus.download.stage == 'unpacking') {
                this.playBtnStatus('updating')
                status = this.preferences.lang == 'en' ? 'installing...' : 'устанавливаем...'
            } else {
                status = ''
                this.playBtnStatus('play')
            }
            return status
        }
	},
	methods: {
        ...mapMutations(['playBtnStatus']),
	}
}
</script>
