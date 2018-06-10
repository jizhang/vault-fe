import Vue from 'vue'
import Router from 'vue-router'
import ETL from '@/components/ETL'
import Monitor from '@/components/Monitor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/etl',
      name: 'ETL',
      component: ETL,
    },
    {
      path: '/monitor',
      name: 'Monitor',
      component: Monitor,
    },
    {
      path: '*',
      redirect: '/etl',
    }
  ]
})
