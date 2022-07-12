<script setup lang="ts">
import router from '@/router'

function createDb() {
  console.log('Create database.')
}
</script>

<template>
  <transition name="fade">
    <div class="page-metadata-db-list">
      <div style="float: right">
        <el-button-group>
          <el-button type="success" size="small" icon="el-icon-plus" @click="createDb">
            新建数据库
          </el-button>
          <el-button
            type="success"
            size="small"
            icon="el-icon-d-arrow-left"
            @click="router.push({ path: '/dashboard/meta/table/list' })"
          >
            返回
          </el-button>
        </el-button-group>
      </div>
      <div class="page-title">管理数据库</div>
    </div>
  </transition>
</template>

<style lang="less">
.page-metadata-db-list {
  .page-title {
    font-size: 18px;
    line-height: 18px;
    margin-bottom: 20px;
  }
}
</style>
