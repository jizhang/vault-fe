<script setup>
import _ from 'lodash'
import { onMounted } from 'vue'
import { MessageBox } from 'element-ui'
import useStore from '@/stores/businessOnline'
import router from '@/router'
import { useH } from '@/common/utils'

const store = useStore()
const h = useH()

onMounted(() => {
  store.fetchData()
})

function showQuery(itemId) {
  const item = _.find(store.data, ['id', itemId])
  MessageBox({
    title: item.title,
    message: h('textarea', {
      style: 'width: 100%; height: 200px',
      domProps: {
        value: item.query,
        readOnly: true,
      },
    }),
  })
}

function createItem() {
  router.push({
    path: '/dashboard/data-quality/business-online/edit',
  })
}

function editItem(itemId) {
  router.push({
    path: '/dashboard/data-quality/business-online/edit',
    query: { id: itemId },
  })
}

function deleteItem(itemId) {
  const data = { id: itemId }
  store.deleteItem(data).then(() => {
    store.fetchData()
  })
}
</script>

<template>
  <transition name="fade">
    <div class="page-business-online">
      <div style="float: right">
        <el-button
          type="success"
          size="small"
          icon="el-icon-plus"
          @click="createItem"
        >
          新建
        </el-button>
      </div>
      <div class="page-title">
        新上线业务监控
      </div>

      <el-table :data="store.data">
        <el-table-column
          prop="id"
          label="#"
          min-width="50"
        />
        <el-table-column
          prop="title"
          label="业务名称"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-tooltip
              content="查看 SQL"
              placement="right"
            >
              <el-button
                type="text"
                @click="showQuery(scope.row.id)"
              >
                {{ scope.row.title }}
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          min-width="80"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.status === 1"
              type="success"
              close-transition
            >
              有效
            </el-tag>
            <el-tag
              v-if="scope.row.status === 2"
              type="gray"
              close-transition
            >
              暂停
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="负责人"
          min-width="80"
        />
        <el-table-column
          prop="created_at"
          label="创建时间"
          min-width="180"
        />
        <el-table-column
          label="操作"
          min-width="160"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              icon="el-icon-edit"
              @click="editItem(scope.row.id)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确定要删除吗？"
              @confirm="deleteItem(scope.row.id)"
            >
              <el-button
                slot="reference"
                type="text"
                size="mini"
                icon="el-icon-delete"
              >
                删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </transition>
</template>

<style lang="less">
.page-business-online {
  .page-title {
    font-size: 18px;
    line-height: 18px;
    margin-bottom: 20px;
  }
}
</style>
