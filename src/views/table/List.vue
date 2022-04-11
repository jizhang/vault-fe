<template>
  <div class="page-etl">
    <div class="title-button">
      <el-button type="primary" size="mini" @click="$router.push('/table/edit')">New</el-button>
    </div>

    <div class="page-title">
      Tables
    </div>
    <el-table :data="tableList" style="width: 100%">
      <el-table-column prop="id" label="#" min-width="50"></el-table-column>
      <el-table-column prop="sourceDatabase" label="Source DB" min-width="150"></el-table-column>
      <el-table-column prop="sourceTable" label="Source Table" min-width="150"></el-table-column>
      <el-table-column prop="targetTable" label="Target Table" min-width="150"></el-table-column>
      <el-table-column prop="createdAt" label="Create Time" min-width="180"></el-table-column>
      <el-table-column label="Operations" min-width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="onEdit(scope.row)">Edit</el-button>
          <el-button type="text" @click="onDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss">
.page-etl {
  .page-title {
    font-size: 14px;
    line-height: 28px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .title-button {
    float: right;
  }
}
</style>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TableList',

  computed: {
    ...mapState('table', [
      'tableList',
    ]),
  },

  mounted () {
    this.fetchTableList()
  },

  methods: {
    ...mapActions('table', [
      'fetchTableList',
      'deleteTable',
    ]),

    onEdit(table) {
      this.$router.push({
        path: '/table/edit',
        query: _.pick(table, ['id']),
      })
    },

    onDelete(table) {
      this.$confirm(`Are you sure to delete ${table.targetTable}?`, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        let payload = _.pick(table, ['id'])
        this.deleteTable(payload).then(() => {
          this.fetchTableList()
        })
      }).catch(_.noop)
    },
  },
}
</script>
