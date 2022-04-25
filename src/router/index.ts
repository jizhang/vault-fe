import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Dashboard from '@/layouts/Dashboard.vue'
import TableList from '@/views/table/List.vue'
import TableEdit from '@/views/table/Edit.vue'
import DbList from '@/views/DbList.vue'
import Monitor from '@/views/Monitor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/',
      component: Dashboard,
      children: [
        {
          path: 'table/list',
          component: TableList,
        },
        {
          path: 'table/edit',
          component: TableEdit,
        },
        {
          path: 'db/list',
          component: DbList,
        },
        {
          path: 'monitor',
          component: Monitor,
        },
      ],
    },
    {
      path: '',
      redirect: '/table/list',
    },
  ],
})

export default router
