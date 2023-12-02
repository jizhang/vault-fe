import _ from 'lodash'
import { defineStore } from 'pinia'
import * as service from '@/services/metaTable'
import * as userService from '@/services/user'

export default defineStore('metaTable', {
  state: () => ({
    userOptions: [] as any[],
    dbOptions: [] as any[],
  }),

  actions: {
    async getUserOptions() {
      const response = await userService.getUserList()
      this.userOptions = _.map(response.data.payload, (user) => {
        return {
          label: user.username,
          value: user.id,
          current: !!user.is_current,
        }
      })
    },

    async getDbOptions() {
      const response = await service.getDbList()
      this.dbOptions = _.map(response.data.payload, (db) => {
        return {
          value: db.id,
          label: db.db_alias,
        }
      })
    },
  },
})
