<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function onNew() {
  router.push({ path: '/table/edit' })
}

const tableList = ref([
  {
    id: 1,
    sourceInstance: 2,
    sourceDatabase: 'zhuanqian',
    sourceTable: 'user',
    targetInstance: 1,
    targetDatabase: 'dw_stage',
    targetTable: 'ds_user',
    columnList: 'id,create_day',
    createdAt: '2018-08-18 15:53:01',
    updatedAt: '2018-08-18 15:53:01',
  },
])
</script>

<template>
  <div class="page-table-list">
    <div class="title-button">
      <el-button type="primary" size="small" @click="onNew">New</el-button>
    </div>
    <div class="page-title">Tables</div>

    <el-table :data="tableList">
      <el-table-column prop="id" label="#" min-width="50"></el-table-column>
      <el-table-column prop="sourceDatabase" label="Source DB" min-width="150"></el-table-column>
      <el-table-column prop="sourceTable" label="Source Table" min-width="150"></el-table-column>
      <el-table-column prop="targetTable" label="Target Table" min-width="150"></el-table-column>
      <el-table-column prop="createdAt" label="Create Time" min-width="180"></el-table-column>
      <el-table-column label="Operations" min-width="120">
        <template #default>
          <el-button type="text">Edit</el-button>
          <el-button type="text">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
.page-table-list {
  & .page-title {
    line-height: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  & .title-button {
    float: right;
  }
}
</style>
