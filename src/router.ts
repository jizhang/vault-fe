import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from './layout/Dashboard.vue'
import Login from './views/Login.vue'
import MetaTableList from './views/meta/TableList.vue'
import MetaDbList from './views/meta/DbList.vue'
import TransferSchemaList from './views/transfer/SchemaList.vue'

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
      { path: 'transfer/schema/list', component: TransferSchemaList },
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
  routes,
})

export default router
