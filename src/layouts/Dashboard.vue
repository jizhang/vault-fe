<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import { Sort, Bell, ArrowDown, User } from '@element-plus/icons-vue'
import useAuthStore from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.currentUser.id) {
    authStore.getCurrentUser()
  }
})

async function logout() {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <el-container style="height: 100vh">
    <el-header class="app-header">
      <img src="@/assets/logo.svg" class="logo" /><span class="app-title">Morph</span>
      <el-dropdown class="user-menu">
        {{ authStore.currentUser?.username }} <el-icon><ArrowDown /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="User" @click="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>
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
  box-shadow: 0 2px 8px var(--el-border-color-lighter);
  margin-bottom: 10px;

  & .app-title {
    font-size: var(--el-font-size-extra-large);
    font-weight: bold;
    line-height: 60px;
    color: var(--el-text-color-primary);
  }

  & .logo {
    height: 35px;
    margin-right: 20px;
    vertical-align: middle;
  }

  & .user-menu {
    float: right;
    line-height: 60px;
    cursor: pointer;
  }
}
</style>
