import { inject, provide } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type { BasicTableProps, Nullable, TableActionType } from '@lj/components/../../../../../types/v-table'
import { Recordable } from '@lj/components/../../../../../types/shims'

const key = Symbol('v-table')

type Instance = TableActionType & {
  wrapRef: Ref<Nullable<HTMLElement>>
  getBindValues: ComputedRef<Recordable>
}

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<BasicTableProps>
}
export function createTableContext(instance: Instance) {
  provide(key, instance)
}
export function useTableContext(): RetInstance {
  return inject(key) as RetInstance
}
