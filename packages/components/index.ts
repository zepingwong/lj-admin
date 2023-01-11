/**
 * !----------- WARNING ------------!
 *
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import type { App, Plugin } from 'vue'
import { VTablePlugin } from './src/v-table'

const VVue3Plugin: Plugin = {
  install(app: App) {
    VTablePlugin.install?.(app)
  },
}

export default VVue3Plugin
