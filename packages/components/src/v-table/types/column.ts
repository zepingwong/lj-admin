import { ColumnProps } from 'ant-design-vue/es/table'
import { ComponentType } from './component'
export interface BasicColumn extends ColumnProps<Recordable> {
  children?: BasicColumn[]
  filters?: {
    text: string
    value: string
    children?: unknown[] | (((props: Record<string, unknown>) => unknown[]) & (() => unknown[]) & (() => unknown[]))
  }[]

  //
  flag?: 'INDEX' | 'DEFAULT' | 'CHECKBOX' | 'RADIO' | 'ACTION'
  customTitle?: VueNode

  slots?: Recordable

  // Whether to hide the column by default, it can be displayed in the column configuration
  defaultHidden?: boolean

  // Help text for table column header
  helpMessage?: string | string[]

  format?: CellFormat

  // Editable
  edit?: boolean
  editRow?: boolean
  editable?: boolean
  editComponent?: ComponentType
  editComponentProps?:
    | ((opt: {
        text: string | number | boolean | Recordable
        record: Recordable
        column: BasicColumn
        index: number
      }) => Recordable)
    | Recordable
  editRule?: boolean | ((text: string, record: Recordable) => Promise<string>)
  editValueMap?: (value: any) => string
  onEditRow?: () => void
  // 权限编码控制是否显示
  auth?: RoleEnum | RoleEnum[] | string | string[]
  // 业务控制是否显示
  ifShow?: boolean | ((column: BasicColumn) => boolean)
  // 自定义修改后显示的内容
  editRender?: (opt: {
    text: string | number | boolean | Recordable
    record: Recordable
    column: BasicColumn
    index: number
  }) => VNodeChild | JSX.Element
  // 动态 Disabled
  editDynamicDisabled?: boolean | ((record: Recordable) => boolean)
}
