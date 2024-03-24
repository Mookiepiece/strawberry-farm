# RadioGroup

# Spec

- 是用 `[role="picker"]` 实现的，因为 `radio` 设计模式下那个 tabindex 向下代理实在反智，连 Vue 的 fall through props 都不好往下传。
- 聚焦时 （包括点击导致的）如果发现没匹配的选项值，会洗出第一个游标。
- 单选模式下且不设置可清空则游标的移动会导致自动改值，多选或可清空则只移动游标，不会改变值。
- 方向键移动游标，多选模式按空格以选择，回车时提交外层表单。

:::demo components/RadioGroup
:::

:::demo components/RadioGroupCheckboxGroup
:::