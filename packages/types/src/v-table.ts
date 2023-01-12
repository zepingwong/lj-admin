import type { ColumnProps } from 'ant-design-vue/es/table'
import type { VNodeChild } from 'vue'
import { PaginationProps } from './v-pagination'
import type { TableRowSelection as ITableRowSelection } from 'ant-design-vue/lib/table/interface'

export interface BasicColumn extends ColumnProps<Recordable> {
  children?: BasicColumn[]
}

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

export interface BasicTableProps<T = any> {
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
  scrollTo: (pos: string) => void // pos: id | "top" | "bottom"
  getPaginationRef: () => PaginationProps | boolean

  setProps: (props: Partial<BasicTableProps>) => void
  setShowPagination: (show: boolean) => Promise<void>
  getShowPagination: () => boolean
  getSize: () => SizeType
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
