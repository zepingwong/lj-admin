import type { App, Plugin } from 'vue'
import VScrollbar from './src/index.vue'

export const VScrollbarPlugin: Plugin = {
  install(app: App) {
    app.component('VScrollbar', VScrollbar)
  }
}

export { VScrollbar }
export * from './types'
