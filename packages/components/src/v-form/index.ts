import type { App, Plugin } from 'vue'
import VForm from './src/index.vue'

export const VFormPlugin: Plugin = {
  install(app: App) {
    app.component('VForm', VForm)
  }
}

export { VForm }
