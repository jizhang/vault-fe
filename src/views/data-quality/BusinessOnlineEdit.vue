<script setup>
import _ from 'lodash'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { MessageBox } from 'element-ui'
import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/theme-chrome'
import 'ace-builds/src-noconflict/mode-sql'
import router from '@/router'
import useStore from '@/stores/businessOnline'
import useTableStore from '@/stores/metaTable'
import { useH } from '@/common/utils'

const store = useStore()
const tableStore = useTableStore()
const h = useH()

const { userOptions, dbOptions } = storeToRefs(tableStore)

const defaultForm = {
  id: '',
  title: '',
  user_id: '',
  status: 1,
  db_id: '',
  query: '',
}

const form = ref({
  ...defaultForm,
})
const formRef = ref(null)

const rules = {
  title: [{ required: true, message: '请输入业务名称' }],
  user_id: [{ required: true, message: '请选择负责人' }],
  db_id: [{ required: true, message: '请选择数据库' }],
  query: [{ required: true, message: '查询语句不能为空' }],
}

const editorRef = ref(null)
let editor = null

onMounted(() => {
  editor = ace.edit(editorRef.value, {
    theme: 'ace/theme/chrome',
    mode: 'ace/mode/sql',
  })

  tableStore.getUserOptions()
  tableStore.getDbOptions()

  const id = _.get(router.currentRoute, ['query', 'id'])
  if (id > 0) {
    store.editItem({ id }).then((data) => {
      updateForm(data)
    })
  }
})

onBeforeUnmount(() => {
  editor.destroy()
})

function updateForm(data) {
  form.value = {
    ...defaultForm,
    ...data,
  }
  editor.session.setValue(data.query)
}

function checkQuery() {
  const data = {
    db_id: form.value.db_id,
    query: editor.session.getValue(),
  }
  store.checkQuery(data).then((result) => {
    if (result.code === 200) {
      MessageBox({
        title: '查询结果',
        message: h(
          'div',
          {
            style: 'white-space: pre',
          },
          result.message
        ),
      })
    } else {
      MessageBox.alert(result.message, '查询失败', {
        type: 'error',
      })
    }
  })
}

function submit() {
  form.value.query = editor.session.getValue()
  formRef.value.validate((isValid) => {
    if (!isValid) {
      return
    }
    store.saveItem(form.value).then(() => {
      router.push({
        path: '/dashboard/data-quality/business-online',
      })
    })
  })
}

function cancel() {
  router.push({
    path: '/dashboard/data-quality/business-online',
  })
}
</script>

<template>
  <transition name="fade">
    <div class="page-business-online-edit">
      <div class="page-title">
        <span v-if="form.id">编辑监控</span>
        <span v-else>新建监控</span>
      </div>

      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px" class="edit-form">
        <el-input type="hidden" v-model="form.id"></el-input>
        <el-form-item label="业务名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="user_id">
          <el-select v-model="form.user_id" placeholder="请选择">
            <el-option
              v-for="item in userOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">有效</el-radio>
            <el-radio :label="2">暂停</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="数据库" prop="db_id">
          <el-select v-model="form.db_id" placeholder="请选择">
            <el-option
              v-for="item in dbOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询语句" prop="query">
          <div ref="editorRef" class="editor"></div>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-caret-right" @click="checkQuery">测试</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>

<style lang="less">
.page-business-online-edit {
  .page-title {
    font-size: 18px;
    line-height: 18px;
    margin-bottom: 20px;
  }

  .edit-form {
    width: 720px;
  }

  .editor {
    height: 320px;

    * {
      font-family: inherit;
    }
  }
}
</style>
