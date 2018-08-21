<template>
  <div class="page-etl">
    <div class="page-button">
      <el-button type="primary" size="mini" @click="$router.push('/table/edit')">New</el-button>
    </div>

    <div class="page-title">
      Tables
    </div>
    <el-table
      :data="tables"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="#"
        width="80"
      />
      <el-table-column
        prop="sourceDatabase"
        label="Source DB"
      />
      <el-table-column
        prop="sourceTable"
        label="Source Table"
      />
      <el-table-column
        prop="targetTable"
        label="Target Table"
      />
      <el-table-column
        prop="createTime"
        label="Create Time"
      />
      <el-table-column
        label="Operations"
        width="120"
      >
        <template slot-scope="scope">
          <el-button type="text" size="mini">Edit</el-button>
          <el-button type="text" size="mini">Delete</el-button>
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

  .page-button {
    float: right;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class List extends Vue {
  public tables: any[] = []

  public mounted() {
    fetch('/api/table/list')
      .then(response => response.json())
      .then(responseJson => {
        this.tables = responseJson.payload
      })
  }
}
</script>
