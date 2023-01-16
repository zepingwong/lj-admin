<template>
  <VScrollbar ref="scrollbarRef" class="scroll-container" v-bind="$attrs">
    <slot></slot>
  </VScrollbar>
</template>

<script lang="ts" setup>
import { ref, unref, nextTick } from 'vue'
import { ScrollbarType, VScrollbar } from '../../v-scrollbar'
import { useScrollTo } from '@lj/hooks'
const scrollbarRef = ref<Nullable<ScrollbarType>>(null)

/**
 * Scroll to the specified position
 */
const scrollTo = (to: number, duration = 500) => {
  const scrollbar = unref(scrollbarRef)
  if (!scrollbar) {
    return
  }
  nextTick(() => {
    const wrap = unref(scrollbar.wrap)
    if (!wrap) {
      return
    }
    const { start } = useScrollTo({
      el: wrap,
      to,
      duration
    })
    start()
  })
}
const getScrollWrap = () => {
  const scrollbar = unref(scrollbarRef)
  if (!scrollbar) {
    return null
  }
  return scrollbar.wrap
}

/**
 * Scroll to the bottom
 */
const scrollBottom = () => {
  const scrollbar = unref(scrollbarRef)
  if (!scrollbar) {
    return
  }
  nextTick(() => {
    const wrap = unref(scrollbar.wrap) as any
    if (!wrap) {
      return
    }
    const scrollHeight = wrap.scrollHeight as number
    const { start } = useScrollTo({
      el: wrap,
      to: scrollHeight
    })
    start()
  })
}
</script>

<style lang="less">
.scroll-container {
  width: 100%;
  height: 100%;

  .scrollbar__wrap {
    margin-bottom: 18px !important;
    overflow-x: hidden;
  }

  .scrollbar__view {
    box-sizing: border-box;
  }
}
</style>
