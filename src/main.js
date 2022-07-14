/* eslint-disable import/first */
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import VueCookie from 'vue-cookie'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'

import 'normalize.css/normalize.css'
import 'basscss/css/basscss.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueCompositionAPI)
Vue.use(VueCookie)
Vue.use(VueI18n)
Vue.use(ElementUI)

import App from './App.vue'
import router from './router'
import store from './store-legacy'
import pinia from './stores'

const messages = {
  en: {
    message: {
      metadata: 'Metadata',
    },
  },
  cn: {
    message: {
      metadata: '元数据管理',
    },
  },
}

const i18n = new VueI18n({
  locale: 'en',
  messages,
})

new Vue({
  render: (h) => h(App),
  router,
  store,
  pinia,
  i18n,
}).$mount('#app')
