<template>
  <div class="p3 justify-center items-center">
    <v-button @click="handleLoading">打开loading</v-button>
    <v-table :columns="columns" show-table-setting :data-source="dataSource"></v-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '性别',
    dataIndex: 'gender'
  }
]

const dataSource = ref([
  {
    name: '小王',
    gender: '男'
  },
  {
    name: '小张',
    gender: '男'
  }
])

const handleLoading = () => {
  alert('test')
}
</script>
