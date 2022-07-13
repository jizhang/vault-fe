<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { getMessage } from './helloWorld'

const message = ref(getMessage())
const tableList = ref([
  {
    id: 1,
    db_alias: 'dw_stage',
  },
])
</script>

<template>
  <transition name="fade">
    <div class="page-metadata-table-list">
      <div style="float: right">
        <el-button-group>
          <el-button
            type="success"
            size="small"
            icon="el-icon-plus"
            @click="router.push({ path: '/dashboard/meta/table/edit' })"
          >
            新建表
          </el-button>
          <el-button
            type="success"
            size="small"
            icon="el-icon-setting"
            @click="router.push({ path: '/dashboard/meta/db/list' })"
          >
            管理数据库
          </el-button>
        </el-button-group>
      </div>
      <div class="page-title">元数据管理</div>
      <div>{{ message }}</div>

      <el-table :data="tableList">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="db_alias" label="Database"></el-table-column>
      </el-table>
    </div>
  </transition>
</template>

<style lang="less">
.page-metadata-table-list {
  .page-title {
    font-size: 18px;
    line-height: 18px;
    margin-bottom: 20px;
  }
}
</style>
