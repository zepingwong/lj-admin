<template>
  <div class="redo-setting">
    <Tooltip placement="top">
      <template #title>
        <span>刷新</span>
      </template>
      <RedoOutlined @click="handleRedo" />
    </Tooltip>
  </div>
</template>

<script lang="ts" setup>
import { RedoOutlined } from '@ant-design/icons-vue'
import { Tooltip } from 'ant-design-vue'
const handleRedo = () => {
  console.log('handleRedo')
}
</script>

<style scoped>
.redo-setting {
  flex: 1;
}
</style>
