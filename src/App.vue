<script setup lang="ts">
import { RouterView } from 'vue-router'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/notification/style/css'
</script>

<template>
  <RouterView />
</template>

<style>
@import '@/assets/base.css';

#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    '微软雅黑', Arial, sans-serif;
  font-size: var(--el-font-size-base);
  color: var(--el-text-color-regular);
}
</style>
