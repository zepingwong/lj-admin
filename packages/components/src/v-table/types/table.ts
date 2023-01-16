import type { ColumnProps } from 'ant-design-vue/es/table'
import type { VNodeChild } from 'vue'
import { PaginationProps } from '@lj/types/src/v-pagination'
import type { TableRowSelection as ITableRowSelection } from 'ant-design-vue/lib/table/interface'
import { EmitType } from '@lj/types/src/common'
import { BasicColumn } from './column'

export type SizeType = 'default' | 'middle' | 'small' | 'large'
export declare type SortOrder = 'ascend' | 'descend'

export interface FetchSetting {
  // 请求接口当前页数
  pageField: string
  // 每页显示多少条
  sizeField: string
  // 请求结果列表字段  支持 a.b.c
  listField: string
  // 请求结果总数字段  支持 a.b.c
  totalField: string
}

export interface TableSetting {
  redo?: boolean
  size?: boolean
  setting?: boolean
  fullScreen?: boolean
}
export type CellFormat =
  | string
  | ((text: string, record: Recordable, index: number) => string | number)
  | Map<string | number, any>
export interface BasicTableProps<T = any> {
  // 列配置
  columns: BasicColumn[]
  isTreeTable?: boolean
  // 序号列配置
  indexColumnProps?: BasicColumn
  actionColumn?: BasicColumn
  // 是否显示序号列
  showIndexColumn?: boolean
  // 数据
  dataSource?: Recordable[]
  // 接口请求对象
  api?: (...arg: any) => Promise<any>
  // 在分页改变的时候清空选项
  clearSelectOnPageChange?: boolean
  // 自定义排序方法
  sortFn?: (sortInfo: SorterResult) => any
  // 排序方法
  filterFn?: (data: Partial<Recordable<string[]>>) => any
  // 是否自动生成key
  autoCreateKey?: boolean
  //
  rowKey?: string | ((record: Recordable) => string)
  // 默认的排序参数
  defSort?: Recordable
  // 表格滚动最大高度
  maxHeight?: number
  // 请求接口配置
  fetchSetting?: Partial<FetchSetting>
  /**
   * Row selection config
   * @type object
   */
  rowSelection?: TableRowSelection
  /**
   * The column contains children to display
   * @default 'children'
   * @type string | string[]
   */
  childrenColumnName?: string
  // 请求之前处理参数
  beforeFetch?: Fn
  // 自定义处理接口返回参数
  afterFetch?: Fn
  // 立即请求接口
  immediate?: boolean
  // loading加载
  loading?: boolean
  // 使用搜索表单
  useSearchForm?: boolean
  // 分页配置
  pagination?: PaginationProps | boolean
  // 额外的请求参数
  searchInfo?: Recordable
  // 点击行选中
  clickToRowSelect?: boolean
  // 显示表格设置
  showTableSetting?: boolean
  // 标题右侧提示
  titleHelpMessage?: string | string[]
  tableSetting?: TableSetting
  // 文本超过宽度是否显示。。。
  ellipsis?: boolean
  // 是否继承父级高度（父级高度-表单高度-padding高度）
  isCanResizeParent?: boolean
  // 是否可以自适应高度
  canResize?: boolean
  // 自适应高度偏移， 计算结果-偏移量
  resizeHeightOffset?: number
  /**
   * Set horizontal or vertical scrolling, can also be used to specify the width and height of the scroll area.
   * It is recommended to set a number for x, if you want to set it to true,
   * you need to add style .ant-table td { white-space: nowrap; }.
   * @type object
   */
  scroll?: { x?: number | true; y?: number }
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
export interface GetColumnsParams {
  ignoreIndex?: boolean
  ignoreAction?: boolean
  sort?: boolean
}
export interface TableActionType {
  reload: (opt?: FetchParams) => Promise<void>
  setSelectedRows: (rows: Recordable[]) => void
  getSelectRows: <T = Recordable>() => T[]
  clearSelectedRowKeys: () => void
  expandAll: () => void
  expandRows: (keys: string[] | number[]) => void
  collapseAll: () => void
  scrollTo: (pos: string) => void // pos: id | "top" | "bottom"
  getSelectRowKeys: () => string[]
  deleteSelectRowByKey: (key: string) => void
  setPagination: (info: Partial<PaginationProps>) => void
  setTableData: <T = Recordable>(values: T[]) => void
  updateTableDataRecord: (rowKey: string | number, record: Recordable) => Recordable | void
  deleteTableDataRecord: (rowKey: string | number | string[] | number[]) => void
  insertTableDataRecord: (record: Recordable, index?: number) => Recordable | void
  findTableDataRecord: (rowKey: string | number) => Recordable | void
  getColumns: (opt?: GetColumnsParams) => BasicColumn[]
  setColumns: (columns: BasicColumn[] | string[]) => void
  getDataSource: <T = Recordable>() => T[]
  getRawDataSource: <T = Recordable>() => T
  setLoading: (loading: boolean) => void
  setProps: (props: Partial<BasicTableProps>) => void
  redoHeight: () => void
  setSelectedRowKeys: (rowKeys: string[] | number[]) => void
  getPaginationRef: () => PaginationProps | boolean
  getSize: () => SizeType
  getRowSelection: () => TableRowSelection<Recordable>
  getCacheColumns: () => BasicColumn[]
  emit?: EmitType
  updateTableData: (index: number, key: string, value: any) => Recordable
  setShowPagination: (show: boolean) => Promise<void>
  getShowPagination: () => boolean
  setCacheColumnsByField?: (dataIndex: string | undefined, value: BasicColumn) => void
}

export interface FetchParams {
  searchInfo?: Recordable
  page?: number
  sortInfo?: Recordable
  filterInfo?: Recordable
}

export interface SorterResult {
  column: ColumnProps
  order: SortOrder
  field: string
  columnKey: string
}

export interface TableRowSelection<T = any> extends ITableRowSelection {
  /**
   * Callback executed when selected rows change
   * @type Function
   */
  onChange?: (selectedRowKeys: string[] | number[], selectedRows: T[]) => any

  /**
   * Callback executed when select/deselect one row
   * @type Function
   */
  onSelect?: (record: T, selected: boolean, selectedRows: Object[], nativeEvent: Event) => any

  /**
   * Callback executed when select/deselect all rows
   * @type Function
   */
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => any

  /**
   * Callback executed when row selection is inverted
   * @type Function
   */
  onSelectInvert?: (selectedRows: string[] | number[]) => any
}
