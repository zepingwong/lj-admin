<template>
  <div class="size-setting">
    <Tooltip placement="top">
      <template #title>
        <span>密度</span>
      </template>
      <Dropdown placement="bottom" :trigger="['click']" :get-popup-container="getPopupContainer">
        <ColumnHeightOutlined />
        <template #overlay>
          <Menu v-model:selectedKeys="selectedKeysRef" selectable @click="handleTitleClick">
            <MenuItem key="default">
              <span>默认</span>
            </MenuItem>
            <MenuItem key="middle">
              <span>中等</span>
            </MenuItem>
            <MenuItem key="small">
              <span>紧凑</span>
            </MenuItem>
          </Menu>
        </template>
      </Dropdown>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ColumnHeightOutlined } from '@ant-design/icons-vue'
import { Dropdown, Menu, MenuItem, Tooltip } from 'ant-design-vue'
import type { SizeType } from '@lj/components/../../../../../../types/v-table'
import { useTableContext } from '../../hooks/useTableContext'
import { getPopupContainer } from '@lj/utils'

const table = useTableContext()
const selectedKeysRef = ref<SizeType[]>([table.getSize()])
const handleTitleClick = ({ key }: { key: SizeType }) => {
  selectedKeysRef.value = [key]
  table.setProps({
    size: key
  })
}
</script>

<style scoped></style>
