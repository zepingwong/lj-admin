const { resolve } = require('path')
const fs = require('fs-extra')
const handlebars = require('handlebars')

const getTplFilePath = (meta) => ({
  // docs 目录
  readme: {
    from: './.template/docs/index.md.tpl',
    to: `../../packages/docs/docs/${meta.compType}/${meta.compName}/index.md`
  },
  demo: {
    from: './.template/docs/basic.vue.tpl',
    to: `../../packages/docs/docs/${meta.compType}/${meta.compName}/demo.vue`
  },
  // src 目录
  vue: {
    from: './.template/src/index.vue.tpl',
    to: `../../packages/datav-vue3/components/${meta.compName}/src/index.vue`
  },
  // 根目录
  install: {
    from: './.template/shims.d.ts.tpl',
    to: `../../packages/datav-vue3/components/${meta.compName}/index.ts`
  }
})

const compFilesTplReplacer = (meta) => {
  const filePaths = getTplFilePath(meta)
  Object.keys(filePaths).forEach((key) => {
    const fileTpl = fs.readFileSync(resolve(__dirname, filePaths[key].from), 'utf-8')
    const fileContent = handlebars.compile(fileTpl)(meta)
    fs.outputFile(resolve(__dirname, filePaths[key].to), fileContent, (err) => {
      if (err) console.log(err)
    })
  })
}

// 读取 packages/list.json 并更新
const listJsonTplReplacer = (meta) => {
  const listFilePath = '../../packages/datav-vue3/list.json'
  const listFileTpl = fs.readFileSync(resolve(__dirname, listFilePath), 'utf-8')
  const listFileContent = JSON.parse(listFileTpl)
  if (meta.compType !== 'Other') {
    listFileContent.forEach((item) => {
      if (item.compType === meta.compType) item.children.push(meta)
    })
  } else {
    listFileContent.unshift(meta)
  }

  const newListFileContentFile = JSON.stringify(listFileContent, null, 2)
  fs.writeFile(resolve(__dirname, listFilePath), newListFileContentFile, (err) => {
    if (err) console.log(err)
  })
  return listFileContent
}

// 更新 router.ts
// const routerTplReplacer = (listFileContent) => {
//   const routerFileFrom = './.template/router.ts.tpl'
//   const routerFileTo = '../../packages/docs/src/router.ts'
//   const routerFileTpl = fs.readFileSync(resolve(__dirname, routerFileFrom), 'utf-8')
//   const routerMeta = {
//     routes: listFileContent.map((comp) => {
//       if (comp.compType === 'Other') {
//         return ` {
//   title: '${comp.compZhName}',
//   name: '${comp.compName}',
//   path: '/components/${comp.compName}',
//   component: () => import('@/src/pages/${comp.compName}/docs/README.md'),
// }`
//       }
//       else {
//         return comp.children.map(child => ` {
//   title: '${child.compZhName}',
//   name: '${child.compName}',
//   path: '/components/${child.compName}',
//   component: () => import('@/src/pages/${child.compName}/docs/README.md'),
// }`)
//       }
//     }),
//   }
//   const routerFileContent = handlebars.compile(routerFileTpl, { noEscape: true })(routerMeta)
//   fs.outputFile(resolve(__dirname, routerFileTo), routerFileContent, (err) => {
//     if (err)
//       console.log(err)
//   })
// }

// 更新 install.ts
const installTsTplReplacer = (listFileContent) => {
  const installFileFrom = './.template/install.ts.tpl'
  const installFileTo = '../../packages/datav-vue3/shims.d.ts' // 这里没有写错，别慌
  const installFileTpl = fs.readFileSync(resolve(__dirname, installFileFrom), 'utf-8')
  const installMeta = {
    importPlugins: listFileContent
      .map((item) => {
        if (item.compType === 'Other') return `import { ${item.compName}Plugin } from './components/${item.compName}'`
        else
          return item.children
            .map((child) => `import { ${child.compName}Plugin } from './components/${child.compName}'`)
            .join('\n')
      })
      .join('\n'),
    installPlugins: listFileContent
      .map((item) => {
        if (item.compType === 'Other') return `    ${item.compName}Plugin.install?.(app)`
        else return item.children.map((child) => `    ${child.compName}Plugin.install?.(app)`).join('\n')
      })
      .join('\n'),
    exportPlugins: listFileContent
      .map((item) => {
        if (item.compType === 'Other') return `export * from './components/${item.compName}'`
        else return item.children.map((child) => `export * from './components/${child.compName}'`).join('\n')
      })
      .join('\n')
  }
  const installFileContent = handlebars.compile(installFileTpl, { noEscape: true })(installMeta)
  fs.outputFile(resolve(__dirname, installFileTo), installFileContent, (err) => {
    if (err) console.log(err)
  })
}

module.exports = (meta) => {
  compFilesTplReplacer(meta)
  const listFileContent = listJsonTplReplacer(meta)
  // routerTplReplacer(listFileContent)
  installTsTplReplacer(listFileContent)

  console.log(`组件新建完毕，请前往 packages/datav-vue3/components/${meta.compName} 目录进行开发`)
}
