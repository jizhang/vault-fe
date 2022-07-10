<template>
  <div style="width: 500px; margin: 100px auto auto auto; padding-right: 120px;">
    <el-form :model="login" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="login.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="login.password" @keyup.enter.native="signIn"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signIn" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '../common/api'

export default {
  data() {
    return {
      login: {
        username: '',
        password: '',
      },
      loading: false,
    }
  },

  methods: {
    signIn() {
      this.loading = true
      api.post('/login', this.login).then(() => {
        this.loading = false

        this.$message({
          message: '登录成功！',
          type: 'success',
        })

        this.$cookie.set('vault_username', this.login.username, 365)

        $router.push({
          path: '/dashboard',
        })
      }).catch(() => { this.loading = false })
    },
  },
}
</script>
