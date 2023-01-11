import DefaultTheme from 'vitepress/theme'
import './style'
import { Theme } from 'vitepress'

import VVue3Plugin from '../../../../components/index'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(VVue3Plugin)
  }
}

export default theme
