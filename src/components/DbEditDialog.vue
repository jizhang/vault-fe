<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps<{
  db: object
}>()
const emit = defineEmits(['save', 'cancel'])

const defaultForm = {
  id: '',
  name: '',
  host: '',
  port: '',
  username: '',
  password: '',
}

const dbForm = ref({
  ...defaultForm,
})

const rules: FormRules = {
  name: [{ required: true }],
  host: [{ required: true }],
  port: [{ required: true }, { type: 'number' }],
  username: [{ required: true }],
}

const dbFormRef = ref<FormInstance>()

function editDb() {
  dbForm.value = {
    ...defaultForm,
    ...props.db,
  }
}

function saveDb() {
  dbFormRef.value?.validate((isValid) => {
    if (!isValid) {
      return
    }
    emit('save', dbForm.value)
  })
}
</script>

<template>
  <el-dialog @open="editDb">
    <template #title>
      <span v-if="!dbForm.id">New Instance</span>
      <span v-else>Edit Instance</span>
    </template>
    <el-form :model="dbForm" label-width="120px" style="width: 80%" :rules="rules" ref="dbFormRef">
      <el-form-item label="Name" prop="name">
        <el-input v-model="dbForm.name" />
      </el-form-item>
      <el-form-item label="Host" prop="host">
        <el-input v-model="dbForm.host" />
      </el-form-item>
      <el-form-item label="Port" prop="port">
        <el-input v-model.number="dbForm.port" />
      </el-form-item>
      <el-form-item label="Username" prop="username">
        <el-input v-model="dbForm.username" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="dbForm.password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="$emit('cancel')">Cancel</el-button>
      <el-button type="primary" @click="saveDb">Save</el-button>
    </template>
  </el-dialog>
</template>
