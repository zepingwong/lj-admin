<!-- 加载 demo 组件 start -->
<script setup>
import basic from "./basic.vue";
import bordered from "./bordered.vue";
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# ***一般表格***

## ***基础用法***

<ClientOnly>
  <basic />
</ClientOnly>

<details>
<summary>查看代码</summary>

<<< @/components/Table/BasicTable/basic.vue

</details>

## ***带边框***

<ClientOnly>
  <bordered />
</ClientOnly>

## ***props***

| 参数               | 说明                       | 类型                                     | 默认值                             | 版本  |
|------------------|--------------------------|----------------------------------------|---------------------------------|-----|
| showTableSetting | 是否显示表格操作按钮               | `boolean`                              | `false`                         ||
| tableSetting     | 表格操作按钮                   | [`TableSetting`](#tablesetting)        | [`TableSetting`](#tablesetting) |
| pagination       | 分页配置，设为 false 时不展示和进行分页	 | [`PaginationProps`]() &#124; `boolean` ||
| bordered         | 	是否展示外边框和列边框	            | `boolean`                              | `false`                         |


## ***events***

## ***types***

### ***TableSetting***

| 参数         | 属性  | 说明       |    默认值    |
|------------|-----|----------|:---------:|
| redo       | 可选  | 刷新表格数据按钮 |  `true`   |
| size       | 可选  | 表格行密度    |  `true`   |
| setting    | 可选  | 表格设置     |  `true`   |
| fullscreen | 可选  | 全屏       |  `false`  |




