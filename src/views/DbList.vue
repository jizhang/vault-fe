<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDbStore } from '@/stores/db'
import DbEditDialog from '@/components/DbEditDialog.vue'

const store = useDbStore()

const dialogVisible = ref(false)
const editingDb = ref<object>({})

onMounted(() => {
  store.getDbList()
})

function createDb() {
  editingDb.value = {}
  dialogVisible.value = true
}

function editDb(db: object) {
  editingDb.value = db
  dialogVisible.value = true
}

function saveDb(data: object) {
  store.saveDb(data).then(() => {
    dialogVisible.value = false
    store.getDbList()
  })
}

function deleteDb(dbId: number) {
  store.deleteDb({ id: dbId }).then(() => {
    store.getDbList()
  })
}
</script>

<template>
  <div class="page-db-list">
    <div class="title-button">
      <el-button type="primary" size="small" @click="createDb">New</el-button>
    </div>
    <div class="page-title">Database Instances</div>

    <el-table :data="store.dbList">
      <el-table-column prop="id" label="#" width="50"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="host" label="Host"></el-table-column>
      <el-table-column prop="port" label="Port"></el-table-column>
      <el-table-column prop="username" label="Username"></el-table-column>
      <el-table-column prop="createdAt" label="Create Time" width="180"></el-table-column>
      <el-table-column label="Operations" width="120">
        <template #default="scope">
          <el-button type="text" @click="editDb(scope.row)">Edit</el-button>
          <el-popconfirm title="Are you sure to delete this?" @confirm="deleteDb(scope.row.id)">
            <template #reference>
              <el-button type="text">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <DbEditDialog
      v-model="dialogVisible"
      :db="editingDb"
      @save="saveDb"
      @cancel="dialogVisible = false"
    />
  </div>
</template>

<style>
.page-db-list {
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
