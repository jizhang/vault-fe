<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import useStore from '@/stores/auth'

const router = useRouter()
const store = useStore()

const loginForm = reactive({
  username: '',
  password: '',
})

const loginFormRef = ref<FormInstance>()

const rules: FormRules = {
  username: [{ required: true }],
  password: [{ required: true }],
}

function login() {
  loginFormRef.value?.validate((isValid) => {
    if (!isValid) {
      return
    }

    store.login(loginForm).then(() => {
      ElMessage.success(`Welcome, ${store.currentUser?.username}!`)
      router.push('/table/list')
    })
  })
}
</script>

<template>
  <div class="page-login">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginFormRef"
      label-width="120px"
      class="login-form"
    >
      <el-form-item label="Username" prop="username">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="loginForm.password" type="password" @keyup.enter="login" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>
.page-login {
  & .login-form {
    width: 380px;
    padding-right: 120px;
    margin: 100px auto;
  }
}
</style>
