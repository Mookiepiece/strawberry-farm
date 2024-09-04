# Listbox

Pick option(s) from a list of options.

在一组选项中选择一个或一些。

## View

Spec: https://www.w3.org/WAI/ARIA/apg/patterns/listbox/

```html
<div role="listbox">
  <div role="option"></div>
  <div role="group">
    <h6>Title</h6>
    <div role="option"></div>
  </div>
</div>
```

| kbd                                         |                                                   |
| ------------------------------------------- | ------------------------------------------------- |
| <vp-kbd k="up" /> / <vp-kbd k="left" />     | Navigates to prev. `nav(-1)`                      |
| <vp-kbd k="down" /> / <vp-kbd k="right" />  | Navigates to next. `nav(1)`                       |
| <vp-kbd k="Home" />                         | Navigates to the beginning. `nav(-Inf)`           |
| <vp-kbd k="End" />                          | Navigates to the end. `nav(Inf)`                  |
| <vp-kbd k="Space" /> / <vp-kbd k="Enter" /> | Toggle current option. `toggle(value)`            |
| <vp-kbd k="Shift+m0" />                     | Toggle options between target and current option. |

TODO: difference between listbox and explorer.

| Note                                                    | Listbox  | Listbox (Multi) | Explorer       | Explorer(Multi) |
| ------------------------------------------------------- | -------- | --------------- | -------------- | --------------- |
| <vp-kbd k="up" /> / <vp-kbd k="Home" /> etc.            | 移动     | 移动            | 移动并赋值单选 | 移动并赋值单选  |
| <vp-kbd k="Ctrl+up" /> / <vp-kbd k="Ctrl+Home" /> etc.  |          |                 | 移动           | 移动            |
| <vp-kbd k="Space" /> / <vp-kbd k="Enter" />             | 选择     | 选择            | 行为           | 行为            |
| <vp-kbd k="m0" />                                       | 选择     | 选择            | 单选           | 单选            |
| <vp-kbd k="Ctrl+m0" />                                  |          |                 | 多选           | 多选            |
| <vp-kbd k="Shift+m0" />                                 | 超级多选 | 超级多选        | 超级多选       | 超级多选        |
| <vp-kbd k="Shift+up" />/ <vp-kbd k="Shift+Home" /> etc. | 超级多选 | 超级多选        | 超级多选       | 超级多选        |

## Basics

Listbox options input supports **any** type of option values, values are `key`s (`String(typeof value + value)`).

Listbox options input supports one level **grouping**.

:::demo patterns/ListboxBasic

:::

## Elite

## Logic

| VListbox    | Description                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| `model`     | Value binding, listbox will in **multiple** mode if model `isArray()`.                                                   |
| `clearable` | While in single option mode, select the same option will unselect it.                                                    |
| `magnetic`  | If `false`, keyboard `nav()` won't update the model. default to `true`, turn it off if the model value is being watched. |
| `options`   | Listbox inputs support any type of value, support one level grouping.                                                    |
| `disabled`  |                                                                                                                          |

| Listbox API       | Description                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | The `id` for creating `aria-activedescendant` to indicate current focused option.                                                           |
| `multi`           | model `isArray()`                                                                                                                           |
| `tree`            | Contains the original (grouped) hierarchy and extra info to rendering the UI.                                                               |
| `options`         | List of options after flatten and normalized, which are objects with `value` property.                                                      |
| `current`         | Current focuing option index (after options are flatted)                                                                                    |
| `nav()`           | Move focus based on the delta number, skipping `disabled` options. if `magnetic`, movement also toggle target option in single option mode. |
| `toggle()`        | Toggle selection for value. Will validate `disabled` state. Passing `listbox` itself will toggle current value.                            |
