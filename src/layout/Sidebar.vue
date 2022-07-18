<script setup lang="ts">
import * as _ from 'lodash'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n-composable'
import { useRouter } from '@/common/utils'

const router = useRouter()
const { t } = useI18n()

const defaultMenu = ref('')

const menuIncludes = {
  '/dashboard/meta/table/list': ['/dashboard/meta/table/', '/dashboard/meta/db/'],
}

onMounted(() => {
  const currentPath = router.currentRoute.path

  const menuOpt = _(menuIncludes)
    .flatMap((prefixes, menu) => _.map(prefixes, (prefix) => [prefix, menu]))
    .filter((t) => _.startsWith(currentPath, t[0]))
    .map(1)
    .first()

  defaultMenu.value = _.defaultTo(menuOpt, currentPath)
})
</script>

<template>
  <div class="sidebar">
    <el-menu
      :default-active="defaultMenu"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened="true"
      :router="true"
    >
      <el-submenu index="/dashboard/meta/">
        <template slot="title">
          <i class="el-icon-receiving menu-icon"></i>
          {{ t('menu.metadata') }}
        </template>
        <el-menu-item index="/dashboard/meta/table/list">
          {{ t('menu.metadataTableList') }}
        </el-menu-item>
      </el-submenu>
      <el-submenu index="/dashboard/transfer/">
        <template slot="title">
          <i class="el-icon-connection menu-icon"></i>
          {{ t('menu.transfer') }}
        </template>
        <el-menu-item index="/dashboard/transfer/schema/list">
          {{ t('menu.transferSchemaList') }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style lang="less">
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 200px;
  height: 100%;
  padding-top: 60px;

  .el-menu {
    height: 100%;
    border: none;
  }

  .menu-icon {
    color: rgba(255, 255, 255, 0.8);
    margin: -3px 2px 0 -10px;
    font-size: 16px;
  }
}
</style>
