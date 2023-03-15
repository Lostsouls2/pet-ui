import Vue from 'vue'
import vueRouter from 'vue-router'

import Login from '@/components/Login.vue'
import Show from '@/components/Show.vue'
import Account from '@/components/Account.vue'
import Role from '@/components/Role.vue'
import Menu from '@/components/Menu.vue'
import test from '@/components/test.vue'


Vue.use(vueRouter)

export default new vueRouter({
    routes:[{
        path:'/',
        component:Login,
        meta: {
            requireAuth: false
        }
    },{
        path:'/Login',
        component:Login,
        meta: {
            requireAuth: false
        }
    },{
        path:'/Show',
        component:Show,
        meta: {
            requireAuth: true
        }
    },{
        path:'/Account',
        component:Account,
        meta: {
            requireAuth: true
        }
    },{
        path:'/Role',
        component:Role,
        meta: {
            requireAuth: true
        }
    },{
        path:'/Menu',
        component:Menu,
        meta: {
            requireAuth: true
        }
    },{
        path:'/test',
        component:test,
        meta: {
            requireAuth: false
        }
    }]
})