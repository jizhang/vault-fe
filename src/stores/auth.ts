import { defineStore } from 'pinia'
import * as service from '@/services/auth'

interface State {
  currentUser: {
    id: number | null
    username: string
  }
}

export default defineStore('auth', {
  state: (): State => ({
    currentUser: {
      id: null,
      username: '',
    },
  }),

  actions: {
    async login(data: object) {
      this.currentUser = await service.login(data)
    },

    async logout() {
      await service.logout()
      this.$reset()
    },

    async getCurrentUser() {
      this.currentUser = await service.getCurrentUser()
    },
  },
})
