<template>
  <div class="column-setting">
    <Tooltip placement="top">
      <template #title>
        <span>列设置</span>
      </template>
      <Popover placement="bottomLeft" trigger="click">
        <SettingOutlined />
      </Popover>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { Tooltip, Popover, Checkbox, Divider } from 'ant-design-vue'
import type { CheckboxChangeEvent } from 'ant-design-vue/lib/checkbox/interface'
import { SettingOutlined, DragOutlined } from '@ant-design/icons-vue'
</script>

<style scoped></style>
