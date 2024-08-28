# Listbox

Pick option(s) from a list of options.

在一组选项中选择一个或一些。

## View

Spec: https://www.w3.org/WAI/ARIA/apg/patterns/listbox/

```html
<div role="listbox">
  <div role="option"></div>
  <div role="group">
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

## Basics

Listbox options input supports **any** type of option values, values are `key`s.

Listbox options input supports one level **grouping**.

:::demo patterns/ListboxBasic

:::

## Elite

## Logic

| VListbox    | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| `model`     | Value binding, listbox will turn into **multiple** mode if model is `Array`. |
| `clearable` | While in single option mode, select the same option will unselect it.        |
| `magnetic`  | Keyboard navigation won't trigger updates.                                   |
| `options`   | Powerful options, supports any type of value, supports one level grouping.   |
| `disabled`  |                                                                              |

| Listbox API       | Description                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            |                                                                                                                                             |
| `id`              | The `id` for creating `aria-activedescendant` to indicate current focused option.                                                           |
| `multi`           | model `isArray`                                                                                                                             |
| `tree`            | Contains the original (grouped) hierarchy and extra info to rendering the UI.                                                               |
| `options`         | List of options after flatten and normalized, which are objects with `value` property.                                                      |
| `current`         | Current focuing option index (after options are flatted)                                                                                    |
| `nav()`           | Move focus based on the delta number, skipping `disabled` options. if `magnetic`, movement also toggle target option in single option mode. |
| `toggle()`        | Toggle selection for value. This is just manipulating `model.value` with `value`, not affected by `disabled` or `options`                   |
| `toggleCurrent()` | Toggle `current` 's value, Will validate `disabled` state for current option before calling `toggle()`                                      |
