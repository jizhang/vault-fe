<template>
  <transition name="fade">
    <div class="page-metadata-table-list">
      <div style="float: right;">
        <el-button-group>
          <el-button type="success" size="small" icon="plus" @click="$router.push({path: '/dashboard/meta/table/edit'})">新建表</el-button>
          <el-button type="success" size="small" icon="setting" @click="$router.push({path: '/dashboard/meta/db/list'})">管理数据库</el-button>
        </el-button-group>
      </div>
      <div class="page-title">元数据管理</div>
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
<script>
  export default {
    data() {
      return {
      }
    },
  }
</script>
