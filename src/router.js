import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from './layout/Dashboard.vue'
import Login from './views/Login.vue'
import MetaTableList from './views/meta/TableList.vue'
import MetaDbList from './views/meta/DbList.vue'

import Config from './common/config.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      { path: 'meta/table/list', component: MetaTableList },
      { path: 'meta/db/list', component: MetaDbList },
      { path: '/*', redirect: 'meta/table/list' },
    ],
  },
  {
    path: '*',
    redirect: '/dashboard',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: Config.prefix,
  routes,
})

window.$router = router

export default router
