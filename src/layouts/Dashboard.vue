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
          <el-sub-menu index="/table">
            <template #title>
              <el-icon><Sort /></el-icon>
              <span>ETL</span>
            </template>
            <el-menu-item index="/table/list">Extract Tables</el-menu-item>
            <el-menu-item index="/db/list">Database Instances</el-menu-item>
          </el-sub-menu>
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
