import type { App, Plugin } from 'vue'
import VButton from './src/index.vue'

export const VButtonPlugin: Plugin = {
  install(app: App) {
    app.component('VButton', VButton)
  }
}

export { VButton }
