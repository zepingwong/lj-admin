import type { App, Plugin } from 'vue'
import VScrollContainer from './src/ScrollContainer.vue'

export const VContainerPlugin: Plugin = {
  install(app: App) {
    app.component('VScrollContainer', VScrollContainer)
  }
}

export { VScrollContainer }
