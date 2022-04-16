<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'

const router = useRouter()

const tableFormRef = ref<FormInstance>()
const tableForm = reactive({
  id: '',
  sourceInstance: '',
  sourceDatabase: '',
  sourceTable: '',
  targetInstance: '',
  targetDatabase: '',
  targetTable: '',
  columnList: '',
})

const rules = {
  sourceInstance: [{ required: true, message: 'Source instance is required' }],
  sourceDatabase: [{ required: true, message: 'Source database is required' }],
  sourceTable: [{ required: true, message: 'Source table is required' }],
  targetInstance: [{ required: true, message: 'Target instance is required' }],
  targetDatabase: [{ required: true, message: 'Target database is required' }],
  targetTable: [{ required: true, message: 'Target table is required' }],
}

const instanceOptions = ref([
  { value: 1, label: 'dw_stage' },
  { value: 2, label: 'zhuanqian' },
])

const columnOptions = ref([
  { name: 'id', extract: true },
  { name: 'username', extract: false },
])

function onSubmit() {
  tableFormRef.value?.validate((valid) => {
    if (!valid) {
      return
    }
    console.log(tableForm)
  })
}

function onCancel() {
  router.push({ path: '/table/list' })
}
</script>

<template>
  <div class="page-table-edit">
    <div class="page-title">
      <span v-if="tableForm.id">Edit Table</span>
      <span v-else>New Table</span>
    </div>

    <el-form
      ref="tableFormRef"
      :model="tableForm"
      label-width="150px"
      style="width: 650px"
      :rules="rules"
    >
      <el-input type="hidden" v-model="tableForm.id" prop="id"></el-input>
      <el-form-item label="Source Instance" prop="sourceInstance">
        <el-select v-model="tableForm.sourceInstance" placeholder="Select" style="width: 162px">
          <el-option
            v-for="item in instanceOptions"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Source Table">
        <el-col :span="8" style="padding-right: 5px">
          <el-form-item prop="sourceDatabase">
            <el-input v-model="tableForm.sourceDatabase" placeholder="Database" />
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-left: 5px">
          <el-form-item prop="sourceTable">
            <el-input v-model="tableForm.sourceTable" placeholder="Table" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Target Instance" prop="targetInstance">
        <el-select v-model="tableForm.targetInstance" placeholder="Select" style="width: 162px">
          <el-option
            v-for="item in instanceOptions"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Target Table">
        <el-col :span="8" style="padding-right: 5px">
          <el-form-item prop="targetDatabase">
            <el-input v-model="tableForm.targetDatabase" placeholder="Database" />
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-left: 5px">
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
            <td>{{ col.name }}</td>
            <td>
              <el-checkbox v-model="col.extract"></el-checkbox>
            </td>
          </tr>
        </table>
        <el-button size="small">Import Columns</el-button>
      </el-form-item>
      <el-form-item style="padding-top: 10px">
        <el-button type="primary" @click="onSubmit">Submit</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>
.page-table-edit {
  & .page-title {
    line-height: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  & .table-columns {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 12px;

    & th {
      text-align: left;
      color: var(--el-text-color-secondary);
    }

    & th,
    & td {
      padding: 0 12px;
      border-bottom: 1px solid var(--el-border-color-lighter);
      height: 32px;
    }

    & tr:not(:first-child):hover {
      background-color: var(--el-border-color-extra-light);
    }
  }
}
</style>
