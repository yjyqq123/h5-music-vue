import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'

import store from './store'
// axios
import axios from 'axios'
// Vue.prototype.axios = axios

// 引入Vant
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Vant,
  render: (h) => h(App)
}).$mount('#app')
