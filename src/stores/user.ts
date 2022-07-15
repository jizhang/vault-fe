import { defineStore } from 'pinia'
import * as service from '@/services/user'

export default defineStore('user', {
  state: () => ({
    username: '',
  }),

  actions: {
    async login(data: object) {
      const response = await service.login(data)
      this.username = response.data.payload.username
    },
  },
})
