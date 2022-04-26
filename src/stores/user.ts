import { defineStore } from 'pinia'
import * as service from '@/services/user'

interface State {
  currentUser?: {
    id: number
    username: string
  }
}

export default defineStore('user', {
  state: (): State => ({}),

  actions: {
    async login(username: string, password: string) {
      this.currentUser = await service.login(username, password)
    },
  },
})
