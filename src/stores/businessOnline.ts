import { defineStore } from 'pinia'
import * as service from '@/services/businessOnline'

export default defineStore('businessOnline', {
  state: () => ({
    data: [] as any[],
  }),

  actions: {
    async fetchData(payload: object) {
      const response = await service.queryBusinessOnlineList(payload)
      if (response && response.data) {
        this.data = response.data.payload.data
      }
    },

    async saveItem(payload: object) {
      await service.saveBusinessOnline(payload)
    },

    async deleteItem(payload: object) {
      await service.deleteBusinessOnline(payload)
    },

    async editItem(payload: object) {
      const response = await service.editBusinessOnline(payload)
      if (response && response.data) {
        return response.data.payload.data
      }
    },

    async checkQuery(payload: object) {
      const response = await service.checkQuery(payload)
      if (response && response.data) {
        return response.data.payload
      }
    },
  },
})
