import Vue from 'vue'
import App from './App.vue'
import 'vue-beauty/package/style/vue-beauty.min.css'
import vueBeauty from 'vue-beauty'
import router from './router'
import axios from 'axios'
import vueSession from 'vue-session'

Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(vueBeauty)
Vue.use(vueSession)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log('守卫')
  // console.log(to.meta.requireAuth)
  // console.log(to.matched[0].meta.requireAuth)
  if (to.meta.requireAuth){
    if (sessionStorage.getItem('token')) {
      next()
    }else {
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
})