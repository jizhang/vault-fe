<template>
  <div class="page-table-edit">
    <div class="page-title">
      <span v-if="table.id">Edit Table</span>
      <span v-else>New Table</span>
    </div>

    <el-form ref="form" :model="table" label-width="150px" style="width: 650px;" :rules="rules">
      <el-form-item label="Source Instance" prop="sourceInstance">
        <el-select v-model="table.sourceInstance" placeholder="Select" style="width: 162px;">
          <el-option
            v-for="item in instanceOptions"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Source Table">
        <el-col :span="8" style="padding-right: 5px;">
          <el-form-item prop="sourceDatabase">
            <el-input v-model="table.sourceDatabase" placeholder="Database"/>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-left: 5px;">
          <el-form-item prop="sourceTable">
            <el-input v-model="table.sourceTable" placeholder="Table" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Target Instance" prop="targetInstance">
        <el-select v-model="table.targetInstance" placeholder="Select" style="width: 162px;">
          <el-option
            v-for="item in instanceOptions"
            :key="item.value"
            :value="item.value"
            :label="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Target Table">
        <el-col :span="8" style="padding-right: 5px;">
          <el-form-item prop="targetDatabase">
            <el-input v-model="table.targetDatabase" placeholder="Database"/>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-left: 5px;">
          <el-form-item prop="targetTable">
            <el-input v-model="table.targetTable" placeholder="Table" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Columns" prop="columns">
        <table class="table-columns">
          <tr>
            <th>Name</th>
            <th>Extract</th>
          </tr>
          <tr v-for="col in table.columns" :key="col.name">
            <td>{{col.name}}</td>
            <td>
              <el-checkbox v-model="col.extract" />
            </td>
          </tr>
        </table>
        <el-button size="mini" @click="importColumns()">Import Columns</el-button>
      </el-form-item>
      <el-form-item style="padding-top: 10px;">
        <el-button type="primary" @click="submit()">Submit</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss">
.page-table-edit {
  .page-title {
    font-size: 14px;
    line-height: 28px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .table-columns {
    font-size: 14px;
    line-height: 20px;
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 10px;

    th {
      text-align: left;
      color: #909399;
    }

    th, td {
      padding: 0 16px;
      border-bottom: 1px solid #ebeef5;
      height: 40px;
    }

    tr:not(:first-child):hover {
      background-color: #f5f7fa;
    }
  }
}
</style>

<script>
import * as _ from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'TableEdit',

  data () {
    return {
      instanceOptions: [
        { value: 1, label: 'dw_stage' },
        { value: 2, label: 'zhuanqian' }
      ],
      rules: {
        sourceInstance: [
          { required: true, message: 'Source instance is required' }
        ],
        sourceDatabase: [
          { required: true, message: 'Source database is required' }
        ],
        sourceTable: [
          { required: true, message: 'Source table is required' }
        ],
        targetInstance: [
          { required: true, message: 'Target instance is required' }
        ],
        targetDatabase: [
          { required: true, message: 'Target database is required' }
        ],
        targetTable: [
          { required: true, message: 'Target table is required' }
        ],
        columns: [
          {
            validator (rule, value, callback) {
              if (_.isEmpty(value)) {
                callback(new Error('Columns are quired'))
                return
              }
              callback()
            }
          }
        ]
      }
    }
  },

  computed: {
    ...mapState('table', [
      'table',
    ]),
  },

  beforeMount () {
    this.$store.commit('table/resetTable')
  },

  mounted () {
    let id = _.get(this.$route.query, 'id')
    if (!_.isUndefined(id)) {
      this.$store.dispatch('table/fetchTable', { id })
    }
  },

  methods: {
    submit () {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }

        let data = _.clone(this.table)
        data.columns = JSON.stringify(data.columns)
        this.$store.dispatch('table/save', data).then(() => {
          this.$message({
            type: 'success',
            message: 'Table is saved',
          })
        }, error => {
          this.$message({
            type: 'error',
            message: String(error),
          })
        })
      })
    },

    importColumns () {
      let form = this.$refs.form

      let props = ['sourceInstance', 'sourceDatabase', 'sourceTable']
      let promises = _.map(props, prop => {
        return new Promise((resolve, reject) => {
          form.validateField(prop, errorMessage => {
            if (errorMessage) {
              reject(new Error(errorMessage))
            } else {
              resolve()
            }
          })
        })
      })

      Promise.all(promises).then(() => {
        let params = _.pick(this.table, props)
        this.$store.dispatch('table/fetchColumns', params)
      }).catch(_.noop)
    }
  }
}
</script>
