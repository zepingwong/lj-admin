import type { App, Plugin } from 'vue'
import VModal from './src/index.vue'

export const VModalPlugin: Plugin = {
  install(app: App) {
    app.component('VModal', VModal)
  }
}

export { VModal }

export * from './src/hooks/useModalContext'
