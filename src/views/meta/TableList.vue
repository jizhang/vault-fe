<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n-composable'
import router from '@/router'

const { t } = useI18n()

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
            {{ t('metadata.tableList.newTable') }}
          </el-button>
          <el-button
            type="success"
            size="small"
            icon="el-icon-setting"
            @click="router.push({ path: '/dashboard/meta/db/list' })"
          >
            {{ t('metadata.tableList.manageDatabase') }}
          </el-button>
        </el-button-group>
      </div>
      <div class="page-title">{{ t('metadata.tableList.title') }}</div>
      <el-table :data="tableList">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column
          prop="db_alias"
          :label="t('metadata.tableList.columns.database')"
        ></el-table-column>
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
