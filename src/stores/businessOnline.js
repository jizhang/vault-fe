import { defineStore } from 'pinia'
import * as service from '@/services/businessOnline'

export default defineStore('businessOnline', {
  state: () => ({
    data: [],
  }),

  actions: {
    async fetchData(payload) {
      const response = await service.queryBusinessOnlineList(payload)
      if (response && response.data) {
        this.data = response.data.payload.data
      }
    },

    async saveItem(payload) {
      await service.saveBusinessOnline(payload)
    },

    async deleteItem(payload) {
      await service.deleteBusinessOnline(payload)
    },

    async editItem(payload) {
      const response = await service.editBusinessOnline(payload)
      if (response && response.data) {
        return response.data.payload.data
      }
    },

    async checkQuery(payload) {
      const response = await service.checkQuery(payload)
      if (response && response.data) {
        return response.data.payload
      }
    },
  },
})
