import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
Vue.use(VueAxios, axios)
Vue.use(PerfectScrollbar)
import './assets/scss/app.scss'
Vue.config.productionTip = false
import './ml'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
