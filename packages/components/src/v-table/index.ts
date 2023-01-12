import type { App, Plugin } from 'vue'
import VTable from './src/index.vue'

export const VTablePlugin: Plugin = {
  install(app: App) {
    app.component('VTable', VTable)
  }
}

export { VTable }
