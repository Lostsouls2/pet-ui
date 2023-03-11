import Vue from 'vue'
import App from './App.vue'
import 'vue-beauty/package/style/vue-beauty.min.css'
import vueBeauty from 'vue-beauty'
import router from './router'
import axios from 'axios'

Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(vueBeauty)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
