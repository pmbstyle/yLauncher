import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import user from './modules/user'
import web from './modules/web-api'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		ui,
		user,
		web
	}
})
