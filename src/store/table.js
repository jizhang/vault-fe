import * as _ from 'lodash'
import * as qs from 'qs'

function defaultTable() {
  return {
    id: null,
    sourceInstance: '',
    sourceDatabase: '',
    sourceTable: '',
    targetInstance: '',
    targetDatabase: '',
    targetTable: '',
    columns: [],
  }
}

export default {
  namespaced: true,

  state: {
    tableList: [],
    table: defaultTable(),
  },

  mutations: {
    save(state, payload) {
      _.assign(state, payload)
    },

    saveTable(state, payload) {
      _.assign(state.table, payload)
    },

    resetTable(state) {
      state.table = defaultTable()
    },
  },

  actions: {
    fetchTableList({ commit }) {
      fetch('/api/table/list')
        .then(response => response.json())
        .then(responseJson => {
          commit({
            type: 'save',
            tableList: responseJson.payload,
          })
        })
    },

    fetchTable({ commit }, payload) {
      let { id } = payload
      fetch(`/api/table/get?${qs.stringify({ id })}`)
        .then(response => response.json())
        .then(responseJson => {
          commit({
            type: 'saveTable',
            ...responseJson.payload,
          })
        })
    },

    async fetchColumns({ state, commit }, payload) {
      let response = await fetch(`/api/table/columns?${qs.stringify(payload)}`)
      let responseJson = await response.json()

      let columns = _(responseJson.payload)
        .filter(column => {
          let existing = _.find(state.table.columns, ['name', column.name])
          return _.isUndefined(existing)
        })
        .map(column => {
          return {
            name: column.name,
            extract: true,
          }
        })
        .value()

      commit({
        type: 'saveTable',
        columns: _.concat(state.table.columns, columns),
      })
    },

    async save({ commit }, payload) {
      let response = await fetch('/api/table/save', {
        method: 'POST',
        body: qs.stringify(payload),
        heasers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      let responseJson = await response.json()

      if (responseJson.code !== 200) {
        throw new Error(responseJson.payload.message)
      }

      commit({
        type: 'saveTable',
        id: responseJson.payload.id,
      })
    },
  },
}
