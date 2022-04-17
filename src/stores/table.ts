import { defineStore } from 'pinia'
import * as service from '@/services/table'

export const useTableStore = defineStore('table', {
  state: () => ({
    tableList: [],
    columnList: [],
    table: {
      id: '',
    },
  }),

  actions: {
    async getTableList() {
      const response = await service.getTableList()
      this.tableList = response.tables
    },

    async getTableColumns(params: object) {
      const response = await service.getTableColumns(params)
      this.columnList = response.columns
    },

    async getTable(params: object) {
      const response = await service.getTable(params)
      this.table = response.table
      this.columnList = response.columns
    },

    async saveTable(data: object) {
      const response = await service.saveTable(data)
      this.table = {
        ...data,
        id: response.id,
      }
    },

    async deleteTable(data: object) {
      await service.deleteTable(data)
    },
  },
})
