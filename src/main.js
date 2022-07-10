/* eslint-disable import/first */
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui'

import 'normalize.css/normalize.css'
import 'basscss/css/basscss.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueCompositionAPI)
Vue.use(VueCookie)
Vue.use(ElementUI)

import App from './App.vue'
import router from './router'
import store from './store-legacy'
import pinia from './stores'

new Vue({
  render: h => h(App),
  router,
  store,
  pinia,
}).$mount('#app')
