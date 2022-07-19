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
      { path: 'meta/table/db/list', component: MetaDbList },
      { path: 'meta/table/', redirect: 'meta/table/list' },

      { path: 'transfer/schema/list', component: TransferSchemaList },
      { path: 'transfer/schema/', redirect: 'transfer/schema/list' },

      { path: '/*', redirect: 'meta/table' },
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
