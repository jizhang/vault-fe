<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n-composable'
import { Message } from 'element-ui'
import { useCookie, useRouter } from '@/common/utils'
import useStore from '@/stores/user'
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'

const cookie = useCookie()
const router = useRouter()
const store = useStore()
const i18n = useI18n()
const { t } = i18n

const username = ref('')

onMounted(() => {
  username.value = cookie.get('vault_username') || ''
  if (!username.value) {
    router.push({ path: '/login' })
  }
})

function userActionSelect(key: string) {
  if (key === '2-1') {
    // logout
    store.logout().then(() => {
      Message.warning(t('userActions.logoutSuccess') as string)
      cookie.delete('vault_username')
      router.push({ path: '/login' })
    })
  } else if (key === '2-2') {
    const locale = i18n.locale.value === 'en' ? 'zh' : 'en'
    i18n.locale.value = locale
    cookie.set('vault_locale', locale, 365)
  }
}
</script>

<template>
  <div class="container">
    <Navbar>
      <template slot="content">
        <div class="navbar-content-wrapper">
          <div class="navbar-content">
            <!-- 头部导航内容 -->
          </div>

          <div class="user-actions">
            <el-menu mode="horizontal" @select="userActionSelect">
              <el-submenu index="2">
                <template slot="title">
                  <span class="username" v-text="username"></span>
                </template>
                <el-menu-item index="2-2">
                  <i class="el-icon-collection user-actions-icon"></i>
                  {{ t('userActions.changeLocale') }}
                </el-menu-item>
                <el-menu-item index="2-1">
                  <i class="el-icon-user user-actions-icon"></i>
                  {{ t('userActions.logout') }}
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </div>
      </template>
    </Navbar>

    <div class="dashboard">
      <Sidebar></Sidebar>
      <div class="page-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import '../less/variables';
@import '../less/mixins';

.container {
  .flexbox();
  .flex(1);

  .navbar-content-wrapper {
    background: @extra-light-gray;
    .flexbox();
    .flex(1);

    .navbar-content {
      .flex(1);
      padding: 15px 20px;
    }

    .user-actions {
      .el-menu {
        min-width: 150px;
        border: none;
        background-color: transparent;
      }
    }
  }

  .dashboard {
    padding: 60px 0 0 200px;
    width: 100%;
    height: auto;

    .page-container {
      padding: 20px;
    }
  }
}

.user-actions-icon {
  font-size: 16px !important;
  margin: -3px 2px 0 0 !important;
}
</style>
