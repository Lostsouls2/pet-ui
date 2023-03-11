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
        component:Login
    },{
        path:'/Login',
        component:Login
    },{
        path:'/Show',
        component:Show
    },{
        path:'/Account',
        component:Account
    },{
        path:'/Role',
        component:Role
    },{
        path:'/Menu',
        component:Menu
    },{
        path:'/test',
        component:test
    }]
})