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
    </el-form>
  </div>
</template>

<style lang="scss">
.page-table-edit {
  .page-title {
    font-size: 14px;
    line-height: 28px;
    font-weight: bold;
    margin-bottom: 8px;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface Table {
  id: number | null,
  sourceInstance: number | '',
  sourceDatabase: string,
  sourceTable: string,
  targetInstance: number | '',
  targetDatabase: string,
  targetTable: string,
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
  }

  public instanceOptions = [
    { value: 1, label: 'dw_stage' },
    { value: 2, label: 'zhuanqian' },
  ]
}
</script>
