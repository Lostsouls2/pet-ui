import Vue from 'vue'
import App from './App.vue'
import 'vue-beauty/package/style/vue-beauty.min.css'
import vueBeauty from 'vue-beauty'

Vue.config.productionTip = false
Vue.use(vueBeauty)

new Vue({
  render: h => h(App),
}).$mount('#app')
