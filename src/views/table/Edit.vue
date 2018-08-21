<template>
  <div class="page-table-edit">
    <div class="page-title">
      <span v-if="table.id">Edit Table</span>
      <span v-else>New Table</span>
    </div>

    <el-form ref="form" :model="table" label-width="150px" style="width: 650px;">
      <el-form-item label="Source Instance">
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
          <el-form-item>
            <el-input v-model="table.sourceDatabase" placeholder="Database"/>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-left: 5px;">
          <el-form-item>
            <el-input v-model="table.sourceTable" placeholder="Table" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Target Instance">
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
          <el-form-item>
            <el-input v-model="table.targetDatabase" placeholder="Database"/>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-left: 5px;">
          <el-form-item>
            <el-input v-model="table.targetTable" placeholder="Table" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Columns">
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
        <el-button size="mini">Import Columns</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">Submit</el-button>
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface Column {
  name: string,
  extract: boolean,
}

interface Table {
  id: number | null,
  sourceInstance: number | '',
  sourceDatabase: string,
  sourceTable: string,
  targetInstance: number | '',
  targetDatabase: string,
  targetTable: string,
  columns: Column[],
}

@Component({})
export default class Edit extends Vue {
  public table: Table = {
    id: null,
    sourceInstance: '',
    sourceDatabase: '',
    sourceTable: '',
    targetInstance: '',
    targetDatabase: '',
    targetTable: '',
    columns: [
      { name: 'col1', extract: true },
      { name: 'col2', extract: false },
    ],
  }

  public instanceOptions = [
    { value: 1, label: 'dw_stage' },
    { value: 2, label: 'zhuanqian' },
  ]
}
</script>
