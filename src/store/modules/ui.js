export default ({
	state: {
		preferences:{
            lang:'en'
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
		}
	},
	getters:{
		preferences(state) {
			return state.preferences
		}

	}
})