<template>
  <Button v-bind="getBindValue">
    <slot v-bind="data || {}"></slot>
  </Button>
</template>
<script lang="ts">
export default {}
const validColors = ['error', 'warning', 'success', ''] as const
</script>
<script lang="ts" setup>
import { Button } from 'ant-design-vue'
import { computed, PropType, unref } from 'vue'

type ButtonColorType = (typeof validColors)[number]

const props = defineProps({
  color: {
    type: String as PropType<ButtonColorType>,
    // eslint-disable-next-line vue/valid-define-props
    validator: (v) => validColors.includes(v as any),
    default: ''
  },
  loading: { type: Boolean },
  disabled: { type: Boolean },
  /**
   * Text before icon.
   */
  preIcon: { type: String },
  /**
   * Text after icon.
   */
  postIcon: { type: String },
  /**
   * preIcon and postIcon icon size.
   * @default: 14
   */
  iconSize: { type: Number, default: 14 },
  onClick: { type: Function as PropType<(...args) => any>, default: null }
})
const getBindValue = computed(() => ({ ...props }))
</script>

<style scoped></style>
