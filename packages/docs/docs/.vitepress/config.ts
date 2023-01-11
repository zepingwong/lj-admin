import { defineConfig } from 'vitepress'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'
import sidebar from "./configs/sidebar"

// const BorderDecorationList = list.filter(item => item.children && item.children.length > 0)
// const OtherList = list.filter(item => !item.children || item.children.length === 0)

// const getDecorationLinkList = ()=>{
//   const links: any[] = []
//
//   BorderDecorationList[0].children?.forEach(item => {
//     links.push({
//       text: item.compZhName,
//       link: `/Decoration/${item.compName}/index`,
//     })
//   })
//   return links
// }
//
// const getBorderLinkList = ()=>{
//   const links: any[] = []
//
//   BorderDecorationList[1].children?.forEach(item => {
//     links.push({
//       text: item.compZhName,
//       link: `/Border/${item.compName}/index`,
//     })
//   })
//   return links
// }
//
// const getOtherLinkList = ()=>{
//   const links: any[] = []
//   OtherList?.forEach(item => {
//     links.push({
//       text: item.compZhName,
//       link: `/Other/${item.compName}/index`,
//     })
//   })
//   return links
// }

export default defineConfig({
  title: 'DataV - Vue3',
  markdown:{
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    }
  },
  themeConfig: {
    siteTitle: 'DataV - Vue3',
    outlineTitle: '目录',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/vaemusic/datav-vue3',
      },
    ],
    nav: [
      { text: '指引', link: '/Guide/index' },
      { text: 'Demo', link: '/Demo/index' },
    ],
    sidebar: sidebar
  },
  vite: {
    resolve: {
      alias: {
        'packages': `${path.resolve(__dirname, '../../../')}/`,
      },
    },
    plugins: [
      Unocss(),
      VueJsx(),
      AutoImport({
        imports: [
          'vue',
        ],
        dts: true,
      }),
    ],
    server:{
      fs:{
        allow: ['..'],
      }
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: 'import { h } from "vue"',
    }
  },
  vue: {
    reactivityTransform: path.resolve(__dirname, 'src'),
  }
})
