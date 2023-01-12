import { computed, h, unref } from 'vue'
import type { ComputedRef, Slots } from 'vue'
import type { BasicTableProps, InnerHandlers, Recordable } from '@lj/components/types/v-table'
import TableHeader from '../components/TableHeader/index.vue'
import { isString, getSlot } from '@lj/utils'

export function useTableHeader(propsRef: ComputedRef<BasicTableProps>, slots: Slots, handlers: InnerHandlers) {
  const getHeaderProps = computed((): Recordable => {
    const { title, showTableSetting, titleHelpMessage, tableSetting } = unref(propsRef)
    const hideTitle = !slots.tableTitle && !title && !slots.toolbar && !showTableSetting
    if (hideTitle && !isString(title)) return {}

    return {
      title: hideTitle
        ? null
        : () =>
            h(
              TableHeader,
              {
                title,
                titleHelpMessage,
                showTableSetting,
                tableSetting,
                onColumnsChange: handlers.onColumnsChange
              } as Recordable,
              {
                ...(slots.toolbar
                  ? {
                      toolbar: () => getSlot(slots, 'toolbar')
                    }
                  : {}),
                ...(slots.tableTitle
                  ? {
                      tableTitle: () => getSlot(slots, 'tableTitle')
                    }
                  : {}),
                ...(slots.headerTop
                  ? {
                      headerTop: () => getSlot(slots, 'headerTop')
                    }
                  : {})
              }
            )
    }
  })
  return { getHeaderProps }
}
