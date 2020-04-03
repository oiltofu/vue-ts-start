import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Api } from './utils/api'

Vue.config.productionTip = false
console.dir(new Api().getInstance())
Vue.prototype.$api = new Api().getInstance()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
