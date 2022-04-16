<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Sort, Bell } from '@element-plus/icons-vue'
</script>

<template>
  <el-container style="height: 100vh">
    <el-header class="app-header"><img src="@/assets/logo.svg" />Morph</el-header>
    <el-container>
      <el-aside width="240px">
        <el-menu :router="true" default-active="/table/list" style="height: 100%">
          <el-menu-item index="/table/list">
            <el-icon><Sort /></el-icon>
            <span>ETL</span>
          </el-menu-item>
          <el-menu-item index="/monitor">
            <el-icon><Bell /></el-icon>
            <span>Monitor</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main><RouterView /></el-main>
    </el-container>
  </el-container>
</template>

<style>
@import '@/assets/base.css';

#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    '微软雅黑', Arial, sans-serif;
  font-size: var(--el-font-size-base);
  color: var(--el-text-color-regular);
}

.app-header {
  font-size: var(--el-font-size-extra-large);
  font-weight: bold;
  line-height: 60px;
  color: var(--el-text-color-primary);
  box-shadow: 0 2px 8px var(--el-border-color-lighter);
  margin-bottom: 10px;

  & img {
    height: 35px;
    margin-right: 20px;
    vertical-align: middle;
  }
}
</style>
