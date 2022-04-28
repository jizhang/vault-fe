import { defineStore } from 'pinia'
import * as service from '@/services/auth'

interface State {
  currentUser?: {
    id: number
    username: string
  }
}

export default defineStore('auth', {
  state: (): State => ({}),

  actions: {
    async login(data: object) {
      this.currentUser = await service.login(data)
    },

    async logout() {
      await service.logout()
    },
  },
})
