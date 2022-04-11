<template>
  <div class="page-table-edit">
    <div class="page-title">
      <span v-if="tableForm.id">Edit Table</span>
      <span v-else>New Table</span>
    </div>

    <el-form ref="form" :model="tableForm" label-width="150px" style="width: 650px;" :rules="rules">
      <el-input type="hidden" v-model="tableForm.id" prop="id"></el-input>
      <el-form-item label="Source Instance" prop="sourceInstance">
        <el-select v-model="tableForm.sourceInstance" placeholder="Select" style="width: 162px;">
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
            <el-input v-model="tableForm.sourceDatabase" placeholder="Database"/>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-left: 5px;">
          <el-form-item prop="sourceTable">
            <el-input v-model="tableForm.sourceTable" placeholder="Table" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Target Instance" prop="targetInstance">
        <el-select v-model="tableForm.targetInstance" placeholder="Select" style="width: 162px;">
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
            <el-input v-model="tableForm.targetDatabase" placeholder="Database"/>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-left: 5px;">
          <el-form-item prop="targetTable">
            <el-input v-model="tableForm.targetTable" placeholder="Table" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Columns" prop="columnList">
        <table class="table-columns">
          <tr>
            <th>Name</th>
            <th>Extract</th>
          </tr>
          <tr v-for="col in columnOptions" :key="col.name">
            <td>{{col.name}}</td>
            <td>
              <el-checkbox v-model="col.extract"></el-checkbox>
            </td>
          </tr>
        </table>
        <el-button size="mini" @click="onImportColumns()">Import Columns</el-button>
      </el-form-item>
      <el-form-item style="padding-top: 10px;">
        <el-button type="primary" @click="onSubmit()">Submit</el-button>
        <el-button @click="onCancel()">Cancel</el-button>
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
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TableEdit',

  data () {
    return {
      instanceOptions: [
        { value: 1, label: 'dw_stage' },
        { value: 2, label: 'zhuanqian' }
      ],
      columnOptions: [],
      tableForm: {
        id: '',
        sourceInstance: '',
        sourceDatabase: '',
        sourceTable: '',
        targetInstance: '',
        targetDatabase: '',
        targetTable: '',
        columnList: '',
      },
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
        columnList: [
          {
            validator: (rule, value, callback) => {
              let selected = _(this.columnOptions).filter('extract').size()
              if (selected === 0) {
                callback(new Error('Column list cannot be empty.'))
              } else {
                callback()
              }
            },
          },
        ],
      }
    }
  },

  computed: {
    ...mapState('table', [
      'table',
      'columnList',
    ]),
  },

  mounted() {
    let id = _.get(this.$route.query, 'id')
    if (!_.isUndefined(id)) {
      let payload = { id }
      this.fetchTable(payload).then(() => {
        _.assign(this.tableForm, this.table)
        this.refreshColumnOptions()
      })
    }
  },

  methods: {
    ...mapActions('table', [
      'fetchTable',
      'fetchColumns',
      'save',
    ]),

    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }

        let selected = _(this.columnOptions).filter('extract').map('name').value()
        if (selected.length === this.columnList.length) {
          selected = []
        }
        this.tableForm.columnList = _.join(selected, ',')

        this.save(this.tableForm).then(() => {
          this.tableForm.id = this.table.id
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

    onCancel() {
      this.$router.push({
        path: '/table/list',
      })
    },

    onImportColumns() {
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
        let params = _.pick(this.tableForm, props)
        this.fetchColumns(params).then(() => {
          if (_.isEmpty(this.columnList)) {
            this.$message({
              type: 'error',
              message: 'Table not found',
            })
            return
          }
          this.refreshColumnOptions()
        })
      }).catch(_.noop)
    },

    refreshColumnOptions() {
      let selected = _.filter(_.split(this.tableForm.columnList, ','))
      this.columnOptions = _.map(this.columnList, name => {
        let extract = _.isEmpty(selected) ? true : _.includes(selected, name)
        return { name, extract }
      })
    },
  },
}
</script>
