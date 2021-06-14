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
		},
		mainmenu: [
			{
				id:0,
				name:'Home',
				nameRu: 'Главная',
				view:'Main',
				is_active:true
			},
			{
				id:1,
				name:'News',
				nameRu: 'Новости',
				view:'News',
				is_active:false
			},
			{
				id:2,
				name:'Settings',
				nameRu: 'Настройки',
				view:'Settings',
				is_active:false
			}
		]
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
		},
		mainmenu(state) {
			return state.mainmenu
		}
	}
})