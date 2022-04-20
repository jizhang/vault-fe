import { defineStore } from 'pinia'
import * as service from '@/services/db'

export const useDbStore = defineStore('db', {
  state: () => ({
    dbList: [],
  }),

  actions: {
    async getDbList() {
      const response = await service.getDbList()
      this.dbList = response.dbList
    },

    async saveDb(data: object) {
      await service.saveDb(data)
    },

    async deleteDb(data: object) {
      await service.deleteDb(data)
    },
  },
})
