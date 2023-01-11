<template>
  <div ref="wrapRef">
    <Table v-bind="getBindData">
      <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
        <slot :name="item" v-bind="data || {}" />
      </template>
      <template #bodyCell="data">
        <slot name="bodyCell" v-bind="data || {}" />
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, unref, useSlots } from 'vue'
import { omit } from 'lodash-es'
import { Table } from 'ant-design-vue'
import 'ant-design-vue/es/table/style/css'
import type { PropType } from 'vue'
import type {
  BasicColumn,
  BasicTableProps,
  ColumnChangeParam,
  InnerHandlers,
  Recordable,
  SizeType,
  TableActionType,
} from '../../../types/v-table/index'
import { useTableHeader } from './hooks/useTableHeader'
import { createTableContext } from './hooks/useTableContext'

const props = defineProps({
  columns: {
    type: [Array] as PropType<BasicColumn[]>,
    default: () => [],
  },
  showTableSetting: Boolean,
})

const emit = defineEmits([
  'fetch-success',
  'fetch-error',
  'selection-change',
  'register',
  'row-click',
  'row-dbClick',
  'row-contextmenu',
  'row-mouseenter',
  'row-mouseleave',
  'edit-end',
  'edit-cancel',
  'edit-row-end',
  'edit-change',
  'expanded-rows-change',
  'change',
  'columnsChange',
])
const slots = useSlots()
const innerPropsRef = ref<Partial<BasicTableProps>>()
const wrapRef = ref(null)
const getProps = computed(() => {
  return { ...props, ...unref(innerPropsRef) } as BasicTableProps
})
const handlers: InnerHandlers = {
  onColumnsChange: (data: ColumnChangeParam[]) => {
    emit('columnsChange', data)
    // support useTable
    unref(getProps).onColumnsChange?.(data)
  },
}
const { getHeaderProps } = useTableHeader(getProps, slots, handlers)
const getBindData = computed(() => {
  let propsData: Recordable = {
    ...unref(getProps),
    ...unref(getHeaderProps),
  }
  propsData = omit(propsData, ['class', 'onChange'])
  return propsData
})

const tableAction: TableActionType = {
  getSize: () => {
    return unref(getBindData).size as SizeType
  },
}
createTableContext({ ...tableAction, wrapRef, getBindData })
defineExpose()
</script>

<style scoped></style>
