<template>
  <div class="table-header">
    <div class="table-header__toolbar">
      <slot name="toolbar" />
      <Divider v-if="$slots.toolbar && showTableSetting" type="vertical" />
      <TableSetting />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Divider } from 'ant-design-vue'
import TableSetting from '../TableSetting/index.vue'

const props = defineProps({
  showTableSetting: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped>
.table-header {
  display: flex;
  width: 100%;
}

.table-header__toolbar {
  margin-left: auto;
}
</style>
