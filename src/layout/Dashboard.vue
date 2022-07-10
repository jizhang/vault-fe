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
                <el-menu-item index="2-1">
                  <i class="el-icon-user" style="margin: -3px 6px 0 0"></i>Logout
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
@import "../less/variables";
@import "../less/mixins";

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
    if (this.$cookie.get('vault_username')) {
      console.log('已登录')
    } else {
      console.log('未登录')
      $router.replace({ path: '/login' })
    }
  },
  methods: {
    userActionSelect(key, keyPath) {
      console.log(key, keyPath)

      if (key === '2-1') { // logout
        api.post('/logout').then(() => {
          this.$message({
            message: '已登出',
            type: 'warning',
          })

          this.$cookie.delete('vault_username')

          $router.replace({ path: '/login' })
        })
      }
    },
  },
}
</script>
