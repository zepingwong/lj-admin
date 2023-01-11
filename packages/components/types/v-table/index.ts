import type { ColumnProps } from 'ant-design-vue/es/table'
import type { VNodeChild } from 'vue'

export declare type Recordable<T = any> = Record<string, T>
export declare type Nullable<T> = T | null
export interface BasicColumn extends ColumnProps<Recordable> {
  children?: BasicColumn[]
}

export type SizeType = 'default' | 'middle' | 'small' | 'large'
export interface TableSetting {
  redo?: boolean
  size?: boolean
  setting?: boolean
  fullScreen?: boolean
}
export interface BasicTableProps<T = any> {
  // 点击行选中
  clickToRowSelect?: boolean
  // 显示表格设置
  showTableSetting?: boolean
  // 标题右侧提示
  titleHelpMessage?: string | string[]
  tableSetting?: TableSetting
  /**
   * Table title renderer
   * @type Function | ScopedSlot
   */
  title?: VNodeChild | JSX.Element | string | ((data: Recordable) => string)
  /**
   * Size of table
   * @default 'default'
   * @type string
   */
  size?: SizeType
  onColumnsChange?: (data: ColumnChangeParam[]) => void
}
export interface ColumnChangeParam {
  dataIndex: string
  fixed: boolean | 'left' | 'right' | undefined
  visible: boolean
}
export interface InnerHandlers {
  onColumnsChange: (data: ColumnChangeParam[]) => void
}

export interface TableActionType {
  setSelectedRows: (rows: Recordable[]) => void
  getSelectRows: <T = Recordable>() => T[]
  clearSelectedRowKeys: () => void
  expandAll: () => void
  expandRows: (keys: string[] | number[]) => void
  collapseAll: () => void
  scrollTo: (pos: string) => void // pos: id | "top" | "bottom"
  getSelectRowKeys: () => string[]
  deleteSelectRowByKey: (key: string) => void
  setTableData: <T = Recordable>(values: T[]) => void
  updateTableDataRecord: (
    rowKey: string | number,
    record: Recordable
  ) => Recordable | void
  deleteTableDataRecord: (
    rowKey: string | number | string[] | number[]
  ) => void
  insertTableDataRecord: (
    record: Recordable,
    index?: number
  ) => Recordable | void
  findTableDataRecord: (rowKey: string | number) => Recordable | void
  setColumns: (columns: BasicColumn[] | string[]) => void
  getDataSource: <T = Recordable>() => T[]
  getRawDataSource: <T = Recordable>() => T
  setLoading: (loading: boolean) => void
  setProps: (props: Partial<BasicTableProps>) => void
  redoHeight: () => void
  setSelectedRowKeys: (rowKeys: string[] | number[]) => void
  getSize: () => SizeType
  getCacheColumns: () => BasicColumn[]
  updateTableData: (index: number, key: string, value: any) => Recordable
  setShowPagination: (show: boolean) => Promise<void>
  getShowPagination: () => boolean
  setCacheColumnsByField?: (
    dataIndex: string | undefined,
    value: BasicColumn
  ) => void
}
