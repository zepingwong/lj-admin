import type { VNodeChild, PropType as VuePropType } from 'vue'

declare global {
  type Recordable<T = any> = Record<string, T>
  type Nullable<T> = T | null

  interface Fn<T = any, R = T> {
    (...arg: T[]): R
  }
}
