import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import axios from 'axios'

window.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:9090'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
