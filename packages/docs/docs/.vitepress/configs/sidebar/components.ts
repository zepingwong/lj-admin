import list from "../../../../../components/list.json"

const components = list.filter(item => item.children && item.children.length > 0)

export default [
    {
        text: '表格',
        items: components[0].children.map((item) => {
            return {
                text: item.compZhName,
                link: `/components/Table/${item.compName}/index`,
            }
        })
    }
]