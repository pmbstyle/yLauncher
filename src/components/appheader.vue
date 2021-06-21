<template>
	<div class="header">
		<div class="drag"></div>
		<div class="userwrap">
			<div id="user">
				<div class="avatar" :style="{ 'background-image': 'url(' + userAvatar + ')' }"></div>
			</div>
			<div class="username">
				<span>{{user.account.minecraftID}}</span>
				<div class="userlvl">{{$ml.get('level')}} <i>80</i></div>
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
				{{preferences.land == 'en' ? item.name : item.nameRu}}
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
	name:'header',
	data: function() {
		return {
			inProgress:false,
			premium:true
		}
	},
	computed: {
		...mapGetters(['user','mainmenu','preferences']),
		userAvatar: function(){
			let url = `https://cdn.discordapp.com/avatars/${this.user.user.id}/${this.user.user.avatar}.png`
			return url
		}
	},
	methods: {
		...mapActions([]),
		...mapMutations(['mainMenuUpdate']),
		
	}
}
</script>
