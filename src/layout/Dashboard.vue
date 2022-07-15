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
                  {{ $t('changeLocale') }}
                </el-menu-item>
                <el-menu-item index="2-1">
                  <i class="el-icon-user user-actions-icon"></i>
                  {{ $t('logout') }}
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

<script>
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
import api from '../common/api'

export default {
  components: {
    Navbar,
    Sidebar,
  },

  data() {
    return {
      username: this.$cookie.get('vault_username'),
    }
  },

  mounted() {
    if (!this.$cookie.get('vault_username')) {
      $router.replace({ path: '/login' })
    }

    const locale = this.$cookie.get('vault_locale')
    if (locale) {
      this.$i18n.locale = locale
    }
  },

  methods: {
    userActionSelect(key) {
      if (key === '2-1') {
        // logout
        api.post('/logout').then(() => {
          this.$message({
            message: '已登出',
            type: 'warning',
          })

          this.$cookie.delete('vault_username')

          $router.replace({ path: '/login' })
        })
      } else if (key === '2-2') {
        const locale = this.$i18n.locale === 'en' ? 'zh' : 'en'
        this.$i18n.locale = locale
        this.$cookie.set('vault_locale', locale, 365)
      }
    },
  },
}
</script>
