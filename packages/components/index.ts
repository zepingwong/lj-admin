/**
 * !----------- WARNING ------------!
 *
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import type { App, Plugin } from 'vue'
import { VTablePlugin } from './src/v-table'
import { VButtonPlugin } from './src/v-button'
import { VModalPlugin } from './src/v-modal'

const VVue3Plugin: Plugin = {
  install(app: App) {
    VTablePlugin.install?.(app)
    VButtonPlugin.install?.(app)
    VModalPlugin.install?.(app)
  }
}

export default VVue3Plugin
