<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n-composable'
import { useCookie } from '@/common/utils'

const cookie = useCookie()
const i18n = useI18n()

onMounted(() => {
  const locale = cookie.get('vault_locale')
  if (locale) {
    i18n.locale.value = locale
  }
})
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
@import './less/site.less';

#app {
  width: 100%;
  height: 100%;
}
</style>
