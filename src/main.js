import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import './assets/scss/app.scss'
Vue.config.productionTip = false
import './ml'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
