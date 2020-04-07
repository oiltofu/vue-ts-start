import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Api } from './utils/api'

import Vuetify from 'vuetify'
// vuetify样式
import 'vuetify/dist/vuetify.min.css'
// 公共样式文件
import '@/styles/index.scss'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.prototype.$api = new Api()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
