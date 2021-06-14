export default ({
	state: {
		preferences:{
            lang:'en'
        },
		client:{
			settings:{
				minRam:1000,
				maxRam:2000
			},
			log:[]
		}
	},
	actions: {
	},
	mutations: {
		uiSetLang: function(state,lang) {
            if(lang == 'ru' || lang == 'en') {
                state.preferences.lang = lang
            } else {
                state.preferences.lang = 'en'
            }
		},
		pushLog: function(state,data) {
			state.client.log.push(data)
		},
		clearLog: function(state) {
			state.client.log = []
		}
	},
	getters:{
		preferences(state) {
			return state.preferences
		},
		client(state) {
			return state.client
		}
	}
})