import _ from 'lodash'
import * as service from '@/services/user'

const types = {
  SAVE: 'save',
}

export default {
  namespaced: true,

  state: {
    username: '',
  },

  actions: {
    async login({ commit }, payload) {
      let response = await service.login(payload)
      if (response && response.data) {
        commit(types.SAVE, {
          username: response.data.payload.username,
        })
      }
    },
  },

  mutations: {
    [types.SAVE](state, payload) {
      _.assign(state, payload)
    },
  },
}
