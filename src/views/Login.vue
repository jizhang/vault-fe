<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Message } from 'element-ui'
import { useI18n } from 'vue-i18n-composable'
import useStore from '@/stores/user'
import { useCookie, useRouter } from '@/common/utils'

const store = useStore()
const cookie = useCookie()
const router = useRouter()
const { t } = useI18n()

const loginForm = reactive({
  username: '',
  password: '',
})

const loading = ref(false)

function signIn() {
  loading.value = true
  store
    .login(loginForm)
    .then(() => {
      loading.value = false
      Message.success(t('userActions.loginSuccess', { username: store.username }) as string)
      cookie.set('vault_username', store.username, 365)
      router.push({
        path: '/dashboard',
      })
    })
    .catch(() => {
      loading.value = false
    })
}
</script>

<template>
  <div style="width: 500px; margin: 100px auto auto auto; padding-right: 120px">
    <el-form :model="loginForm" label-width="120px">
      <el-form-item :label="t('userActions.username')">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item :label="t('userActions.password')">
        <el-input
          type="password"
          v-model="loginForm.password"
          @keyup.enter.native="signIn"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signIn" :loading="loading">
          {{ t('userActions.login') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
