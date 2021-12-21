<template>
	<div class="header">
		<div class="drag"></div>
		<div class="userwrap">
			<div id="user">
				<div class="avatar" :style="{ 'background-image': 'url(https://crafatar.com/renders/head/'+user.user.uuid+'?scale=5&default=MHF_Steve&overlay)' }"></div>
			</div>
			<div class="username">
				<span>{{user.user.name}}</span>
				<div class="userlvl">{{$ml.get('level')}} <i>1</i></div>
			</div>
		</div>
		<div class="menu">
			<div
			class="menu-item"
			:class="{active:item.is_active}"
			v-for="item in mainmenu"
			:key="item.id"
			@click="mainMenuUpdate(item.id)"
			>
				{{menuLang(item.name,item.nameRu)}}
			</div>
		</div>
		<div class="premium">
			{{$ml.get('premium')}}
			<span :class="{active:premium}"></span>
		</div>
	</div>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
	name:'appheader',
	data: function() {
		return {
			inProgress:false,
			premium:false
		}
	},
	watch: {
		'preferences.lang': function(){
			this.$forceUpdate()
		}
	},
	computed: {
		...mapGetters(['user','mainmenu','preferences']),
		userAvatar: function(){
			//let url = `https://cdn.discordapp.com/avatars/${this.user.user.id}/${this.user.user.avatar}.png`
			return ''
		}
	},
	methods: {
		...mapActions([]),
		...mapMutations(['mainMenuUpdate']),
		menuLang: function(en,ru) {
			return this.preferences.lang == 'en' ? en : ru
		}
	}
}
</script>
