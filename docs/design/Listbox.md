# Listbox

## Spec

https://www.w3.org/WAI/ARIA/apg/patterns/listbox/

- Radio Group、 Checkbox Group 均使用 `[role="listbox"]` 实现。，因为 `radio` 的 tabindex 向下代理难以管理，但坏处是，每次切换选项都需要使用 `IntersectionObserver` 以让当前项目出现在界面里。与之相对，`VTree` 则使用 tabindex 向下代理的模式。
- 聚焦时 （包括点击导致的）如果发现没匹配的选项值，会洗出第一个游标。
- 单选模式下且不设置可清空则游标的移动会导致自动改值，多选或可清空则只移动游标，不会改变值。
- 方向键移动游标，单选模式会在移动时自动选择，多选模式按空格或回车以选择。

## Elite

### Radio Group

:::demo design/ListboxRadioGroup
:::

### Checkbox Group

:::demo design/ListboxCheckboxGroup
:::