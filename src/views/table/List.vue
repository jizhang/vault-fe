<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useTableStore } from '@/stores/table'

const router = useRouter()
const store = useTableStore()

onMounted(() => {
  store.getTableList()
})

function createTable() {
  router.push({ path: '/table/edit' })
}

function editTable(id: number) {
  router.push({
    path: '/table/edit',
    query: { id },
  })
}

function deleteTable(id: number) {
  store.deleteTable({ id }).then(() => {
    ElMessage.success('Table is deleted.')
    store.getTableList()
  })
}
</script>

<template>
  <div class="page-table-list">
    <div class="title-button">
      <el-button type="primary" size="small" @click="createTable">New</el-button>
    </div>
    <div class="page-title">Tables</div>

    <el-table :data="store.tableList">
      <el-table-column prop="id" label="#" min-width="50"></el-table-column>
      <el-table-column prop="sourceDatabase" label="Source DB" min-width="150"></el-table-column>
      <el-table-column prop="sourceTable" label="Source Table" min-width="150"></el-table-column>
      <el-table-column prop="targetTable" label="Target Table" min-width="150"></el-table-column>
      <el-table-column prop="createdAt" label="Create Time" min-width="180"></el-table-column>
      <el-table-column label="Operations" min-width="120">
        <template #default="scope">
          <el-button type="text" @click="editTable(scope.row.id)">Edit</el-button>
          <el-popconfirm title="Are you sure to delete this?" @confirm="deleteTable(scope.row.id)">
            <template #reference>
              <el-button type="text">Delete</el-button>
            </template>
          </el-popconfirm>
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
