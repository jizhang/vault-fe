import Vue from 'vue'
import Router from 'vue-router'
import TableList from './views/table/List.vue'
import TableEdit from './views/table/Edit.vue'
import Monitor from './views/Monitor.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/table/list',
      name: 'TableList',
      component: TableList,
    },
    {
      path: '/table/edit',
      name: 'TableEdit',
      component: TableEdit,
    },
    {
      path: '/monitor',
      name: 'Monitor',
      component: Monitor,
    },
    {
      path: '*',
      redirect: '/table/list',
    },
  ],
})
