/* eslint-disable import/first */
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui'

import 'normalize.css/normalize.css'
import 'basscss/css/basscss.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueCookie)
Vue.use(ElementUI)

import App from './App.vue'
import router from './router'
import pinia from './stores'
import i18n from './i18n'

new Vue({
  render: (h) => h(App),
  router,
  pinia,
  i18n,
}).$mount('#app')
