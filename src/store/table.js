import _ from 'lodash'
import * as service from '@/services/table'

const types = {
  SAVE: 'save',
}

export default {
  namespaced: true,

  state: {
    tableList: [],
    table: null,
    columnList: [],
  },

  actions: {
    async getTableList({ commit }, payload) {
      let response = await service.getTableList(payload)
      commit(types.SAVE, {
        tableList: response.tables,
      })
    },

    async getTable({ commit }, payload) {
      let response = await service.getTable(payload)
      commit(types.SAVE, {
        table: response.table,
        columnList: response.columns,
      })
    },

    async getTableColumns({ commit }, payload) {
      let response = await service.getTableColumns(payload)
      commit(types.SAVE, {
        columnList: response.columns,
      })
    },

    async saveTable({ commit }, payload) {
      let response = await service.saveTable(payload)
      commit(types.SAVE, {
        table: {
          ...payload,
          id: response.id,
        },
      })
    },

    async deleteTable({ commit }, payload) {
      await service.deleteTable(payload)
    },
  },

  mutations: {
    [types.SAVE](state, payload) {
      _.assign(state, payload)
    },
  },
}
