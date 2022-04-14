import Api from '../../helpers/api'
export default ({
	state: {
		preferences:{
            lang:'en',
			debug: true,
			env:'test'
        },
		client:{
			settings:{
				minRam:1000,
				maxRam:2000,
				width:800,
				height:600
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
				name:'Game Wiki',
				nameRu: 'База знаний',
				view:'Wiki',
				is_active:false
			},
			{
				id:2,
				name:'Settings',
				nameRu: 'Настройки',
				view:'Settings',
				is_active:false
			},
			{
				id:3,
				name:'Store',
				nameRu: 'Магазин',
				view:'Shop',
				is_active:false
			}
		],
		uiStatus: {
			maintenance:{},
			playButton:'',
			download: {
				status: false,
				percentage:0,
				total:0,
				stage:'downloading'
			},
			showDebug: false
		}
	},
	actions:{
		checkMaintenance: async function({commit}){
			let maintenance = await Api().get(process.env.VUE_APP_WEB_API_GATE+'api/maintenance')
			.then(response => {
				return response.data
			})
			commit('setMaintenance',maintenance)
		}
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
			state.client.log.push({type:data.type,content:data.content})
		},
		clearLog: function(state) {
			state.client.log = []
		},
		playBtnStatus: function(state,status) {
			state.uiStatus.playButton = status
		},
		debugStatus: function(state,status) {
			state.uiStatus.showDebug = status
		},
		mainMenuUpdate: function(state,id) {
			state.mainmenu.forEach(menu => {
				menu.is_active = menu.id == id ? true : false
			})
		},
		saveClientSettings: function(state,data) {
			state.client.settings = data
		},
		savePreferences: function(state, data) {
			state.preferences = data
		},
		updateDownload: function(state, data) {
			state.uiStatus.download = {
				status:data.status,
				percentage:data.percentage,
				total:data.total,
				stage:data.stage
			}
		},
		setMaintenance: function(state, data) {
			state.uiStatus.maintenance = data
		}
	},
	getters:{
		preferences(state) {
			return state.preferences
		},
		client(state) {
			return state.client
		},
		clientSettings(state) {
			return state.client.settings
		},
		mainmenu(state) {
			return state.mainmenu
		},
		uiStatus(state) {
			return state.uiStatus
		}
	}
})