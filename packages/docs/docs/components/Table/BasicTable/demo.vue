<template>
  <div class="p3 justify-center items-center">
    <v-table :columns="columns"></v-table>
  </div>

</template>

<script lang="ts" setup>
const columns = [
  {
    title: "姓名"
  },
  {
    title: "性别"
  }
]
</script>
