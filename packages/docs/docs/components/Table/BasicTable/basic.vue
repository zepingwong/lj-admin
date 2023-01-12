<template>
  <div class="p3 justify-center items-center">
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
    title: '性别'
  }
]

const dataSource = ref([
  {
    name: '小王'
  },
  {
    name: '小张'
  }
])
</script>
