import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { createI18n } from 'vue-i18n-composable'
import en from './en'
import zh from './zh'

Vue.use(VueI18n)

const i18n = createI18n({
  locale: 'en',
  messages: { en, zh },
})

export default i18n
