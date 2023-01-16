<template>
  <div class="column-setting">
    <Tooltip placement="top">
      <template #title>
        <span>列设置</span>
      </template>
      <Popover
        placement="bottomLeft"
        trigger="click"
        :get-popup-container="getPopupContainer"
        class="column-setting__column-list"
        @visible-change="handleVisibleChange"
      >
        <SettingOutlined />
        <template #title>
          <div class="column-setting__popover-title">
            <Checkbox v-model:checked="state.checkAll" :indeterminate="indeterminate" @change="onCheckAllChange">
              列展示
            </Checkbox>
            <Checkbox v-model:checked="checkIndex" @change="handleIndexCheckChange"> 序号列</Checkbox>
          </div>
        </template>
        <template #content>
          <VScrollContainer>
            <CheckboxGroup ref="columnListRef" v-model:value="state.checkedList" @change="onChange"></CheckboxGroup>
          </VScrollContainer>
        </template>
      </Popover>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, unref, nextTick, useAttrs, watchEffect } from 'vue'
import { Tooltip, Popover, Checkbox, Divider, CheckboxGroup } from 'ant-design-vue'
import type { CheckboxChangeEvent } from 'ant-design-vue/lib/checkbox/interface'
import { SettingOutlined, DragOutlined } from '@ant-design/icons-vue'
import { ColumnChangeParam, ComponentRef } from '@lj/types'
import { VScrollContainer } from '../../../../v-container'
import { useTableContext } from '../../hooks/useTableContext'
import Sortablejs from 'sortablejs'
import type Sortable from 'sortablejs'
import { cloneDeep } from 'lodash-es'
import { isFunction, isNullAndUnDef, getPopupContainer as getParentContainer } from '@lj/utils'
import 'ant-design-vue/es/popover/style/css'
import 'ant-design-vue/es/checkbox/style/css'
import { BasicColumn } from '../../../types'

interface State {
  checkAll: boolean
  isInit?: boolean
  checkedList: string[]
  defaultCheckList: string[]
}

interface Options {
  label: string
  value: string
  fixed?: boolean | 'left' | 'right'
}

const checkIndex = ref(false)
const emit = defineEmits(['columns-change'])
const state = reactive<State>({
  checkAll: true,
  checkedList: [],
  defaultCheckList: []
})
const plainOptions = ref<Options[] | any>([])
const plainSortOptions = ref<Options[]>([])
const columnListRef = ref<ComponentRef>(null)
const indeterminate = computed(() => {
  const len = plainOptions.value.length
  const checkedLen = state.checkedList.length
  // unref(checkIndex) && checkedLen--;
  return checkedLen > 0 && checkedLen < len
})
const table = useTableContext()
const setColumns = (columns: BasicColumn[] | string[]) => {
  table.setColumns(columns)
  const data: ColumnChangeParam[] = unref(plainSortOptions).map((col) => {
    const visible =
      columns.findIndex(
        (c: BasicColumn | string) => c === col.value || (typeof c !== 'string' && c.dataIndex === col.value)
      ) !== -1
    return { dataIndex: col.value, fixed: col.fixed, visible }
  })

  emit('columns-change', data)
}
// checkAll change
const onCheckAllChange = (e: CheckboxChangeEvent) => {
  const checkList = plainOptions.value.map((item) => item.value)
  if (e.target.checked) {
    state.checkedList = checkList
    setColumns(checkList)
  } else {
    state.checkedList = []
    setColumns([])
  }
}
let inited = false
let sortable: Sortable
let sortableOrder: string[] = []
const cachePlainOptions = ref<Options[]>([])
// Open the pop-up window for drag and drop initialization
const handleVisibleChange = () => {
  if (inited) return
  nextTick(() => {
    const columnListEl = unref(columnListRef)
    if (!columnListEl) return
    const el = columnListEl.$el as any
    if (!el) return
    // Drag and drop sort
    sortable = Sortablejs.create(unref(el), {
      animation: 500,
      delay: 400,
      delayOnTouchOnly: true,
      handle: '.table-column-drag-icon ',
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt
        if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
          return
        }
        // Sort column
        const columns = cloneDeep(plainSortOptions.value)

        if (oldIndex > newIndex) {
          columns.splice(newIndex, 0, columns[oldIndex])
          columns.splice(oldIndex + 1, 1)
        } else {
          columns.splice(newIndex + 1, 0, columns[oldIndex])
          columns.splice(oldIndex, 1)
        }

        plainSortOptions.value = columns

        setColumns(
          columns.map((col: Options) => col.value).filter((value: string) => state.checkedList.includes(value))
        )
      }
    })
    // 记录原始order 序列
    sortableOrder = sortable.toArray()
    inited = true
  })
}
const attrs = useAttrs()
const getPopupContainer = () => {
  return isFunction(attrs.getPopupContainer) ? attrs.getPopupContainer() : getParentContainer()
}
// Control whether the serial number column is displayed
const handleIndexCheckChange = (e: CheckboxChangeEvent) => {
  table.setProps({
    showIndexColumn: e.target.checked
  })
}
// Trigger when check/uncheck a column
const onChange = (checkedList: string[]) => {
  const len = plainSortOptions.value.length
  state.checkAll = checkedList.length === len
  const sortList = unref(plainSortOptions).map((item) => item.value)
  checkedList.sort((prev, next) => {
    return sortList.indexOf(prev) - sortList.indexOf(next)
  })
  setColumns(checkedList)
}
const getColumns = () => {
  const ret: Options[] = []
  table.getColumns({ ignoreIndex: true, ignoreAction: true }).forEach((item) => {
    ret.push({
      label: (item.title as string) || (item.customTitle as string),
      value: (item.dataIndex || item.title) as string,
      ...item
    })
  })
  return ret
}

function init() {
  const columns = getColumns()

  const checkList = table
    .getColumns({ ignoreAction: true, ignoreIndex: true })
    .map((item) => {
      if (item.defaultHidden) {
        return ''
      }
      return item.dataIndex || item.title
    })
    .filter(Boolean) as string[]

  if (!plainOptions.value.length) {
    plainOptions.value = columns
    plainSortOptions.value = columns
    cachePlainOptions.value = columns
    state.defaultCheckList = checkList
  } else {
    // const fixedColumns = columns.filter((item) =>
    //   Reflect.has(item, 'fixed')
    // ) as BasicColumn[];

    unref(plainOptions).forEach((item: BasicColumn) => {
      const findItem = columns.find((col: BasicColumn) => col.dataIndex === item.dataIndex)
      if (findItem) {
        item.fixed = findItem.fixed
      }
    })
  }
  state.isInit = true
  state.checkedList = checkList
}

watchEffect(() => {
  setTimeout(() => {
    const columns = table.getColumns()
    if (columns.length && !state.isInit) {
      init()
    }
  }, 0)
})
</script>

<style scoped lang="less">
.column-setting {
  &__popover-title {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__cloumn-list {
    svg {
      width: 1em !important;
      height: 1em !important;
    }

    .ant-popover-inner-content {
      // max-height: 360px;
      padding-right: 0;
      padding-left: 0;
      // overflow: auto;
    }

    .ant-checkbox-group {
      width: 100%;
      min-width: 260px;
      // flex-wrap: wrap;
    }

    .scrollbar {
      height: 220px;
    }
  }
}
</style>
