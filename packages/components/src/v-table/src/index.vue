<template>
  <div ref="wrapRef">
    <Table ref="tableElRef" v-bind="getBindData">
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
import { computed, ref, unref, useSlots, toRaw } from 'vue'
import { omit } from 'lodash-es'
import { Table } from 'ant-design-vue'
import 'ant-design-vue/es/table/style/css'
import type { PropType } from 'vue'
import type { BasicTableProps, ColumnChangeParam, InnerHandlers, SizeType, TableActionType } from '@lj/types'
import { useTableHeader } from './hooks/useTableHeader'
import { createTableContext } from './hooks/useTableContext'
import { useTableScrollTo } from './hooks/useTableScrollTo'
import { useDataSource } from './hooks/useDataSource'
import { usePagination } from './hooks/usePagination'
import { useLoading } from './hooks/useLoading'
import { useRowSelection } from './hooks/useRowSelection'
import { useColumns } from './hooks/useColumns'
import { BasicColumn } from '../types'

const props = defineProps({
  columns: {
    type: [Array] as PropType<BasicColumn[]>,
    default: () => []
  },
  showTableSetting: Boolean,
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: null
  },
  bordered: {
    type: Boolean,
    default: false
  },
  showIndexColumn: { type: Boolean, default: true }
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
  'columnsChange'
])
const slots = useSlots()
const innerPropsRef = ref<Partial<BasicTableProps>>()
const wrapRef = ref(null)
const tableElRef = ref(null)
const tableData = ref<Recordable[]>([])
const getProps = computed(() => {
  return { ...props, ...unref(innerPropsRef) } as BasicTableProps
})
const setProps = (props: Partial<BasicTableProps>) => {
  innerPropsRef.value = { ...unref(innerPropsRef), ...props }
}
const handlers: InnerHandlers = {
  onColumnsChange: (data: ColumnChangeParam[]) => {
    emit('columnsChange', data)
    // support useTable
    unref(getProps).onColumnsChange?.(data)
  }
}
const { getHeaderProps } = useTableHeader(getProps, slots, handlers)
const getBindData = computed(() => {
  const dataSource = unref(getDataSourceRef)
  let propsData: Recordable = {
    loading: unref(getLoading),
    dataSource: dataSource,
    pagination: toRaw(unref(getPaginationInfo)),
    ...unref(getProps),
    ...unref(getHeaderProps)
  }
  propsData = omit(propsData, ['class', 'onChange'])
  return propsData
})
const { getPaginationInfo, getPagination, setPagination, setShowPagination, getShowPagination } =
  usePagination(getProps)
const { getLoading, setLoading } = useLoading(getProps)
const { clearSelectedRowKeys } = useRowSelection(getProps, tableData, emit)
const { getDataSourceRef, reload } = useDataSource(
  getProps,
  {
    tableData,
    getPaginationInfo,
    setLoading,
    setPagination,
    getFieldsValue: null!, // TODO useForm
    clearSelectedRowKeys
  },
  emit
)
const { getViewColumns, getColumns, setCacheColumnsByField, setColumns, getColumnsRef, getCacheColumns } = useColumns(
  getProps,
  getPaginationInfo
)
const { scrollTo } = useTableScrollTo(tableElRef, getDataSourceRef)
const tableAction: TableActionType = {
  scrollTo,
  setProps,
  reload,
  setLoading,
  getColumns,
  setColumns,
  getShowPagination,
  getPaginationRef: getPagination,
  setShowPagination,
  getSize: () => {
    return unref(getBindData).size as SizeType
  }
}

defineExpose(tableAction)
// TODO const [registerForm, formActions] = useForm();
emit('register', tableAction)
createTableContext({ ...tableAction, wrapRef, getBindData })
</script>

<style scoped></style>
