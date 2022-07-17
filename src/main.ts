/* eslint-disable import/first */
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui'

import 'normalize.css/normalize.css'
import 'basscss/css/basscss.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueCookie)
Vue.use(ElementUI)

import i18n from './i18n'
import pinia from './stores'
import router from './router'
import App from './App.vue'

new Vue({
  render: (h) => h(App),
  router,
  pinia,
  i18n,
}).$mount('#app')
