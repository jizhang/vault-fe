import { createRouter, createWebHistory } from 'vue-router'
import TableList from '@/views/table/List.vue'
import TableEdit from '@/views/table/Edit.vue'
import Monitor from '@/views/Monitor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/table/list',
      component: TableList,
    },
    {
      path: '/table/edit',
      component: TableEdit,
    },
    {
      path: '/monitor',
      component: Monitor,
    },
    {
      path: '/',
      redirect: '/table/list',
    },
  ],
})

export default router
