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

| Note                                                    | Picker | Picker (Multi) / Checkboxes | Radio / Segmented                  | Classic Listbox(Multi)    | Explorer              |
| ------------------------------------------------------- | ------ | --------------------------- | ---------------------------------- | ------------------------- | --------------------- |
| <vp-kbd k="up" /> / <vp-kbd k="Home" /> etc.            | Move   | Move                        | Circular & Move & Single Selection | Move & Single Selection   | +Can Move into header |
| <vp-kbd k="Ctrl+up" /> / <vp-kbd k="Ctrl+Home" /> etc.  |        |                             |                                    | Move                      | +Can Move into header |
| <vp-kbd k="Space" />                                    | Input  | Input                       | Input                              | Input                     |                       |
| <vp-kbd k="Enter" />                                    | Input  | Input                       | Action(Submit)                     | Action                    |                       |
| <vp-kbd k="m0" />                                       | Input  | Input                       | Input                              | Single                    |                       |
| <vp-kbd k="Ctrl+m0" />                                  |        |                             | Multi                              | Multi                     |                       |
| <vp-kbd k="Shift+m0" />                                 | /      | Multi                       | /                                  | Multi (Range)             |                       |
| <vp-kbd k="Shift+up" />/ <vp-kbd k="Shift+Home" /> etc. | /      | Multi                       | /                                  | Multi (RangeX2)           |                       |
| Note                                                    | /      | Multi                       | /                                  | Only select, no unselect? |                       |

## Basics

Listbox options input supports **any** type of option values, values are `key`s (`String(typeof value + value)`).

Listbox options input supports one level **grouping**.

### Listbox

- Range Selection is Adding, no removing, which is simpler.

:::demo patterns/ListboxBasic

:::

### Radios / Segmented (Single NotA-Listbox)

- Circular Navigation on demand.
- Action is Submit the form.

### Picker / Checkboxes (Multiple NotA-Listbox)

- Circular Navigation on demand.
- Annoying Range Selection (Select / Unselect state into whole)

## Elite

### Radio Group

:::demo patterns/ListboxRadiosPlay

:::

## Logic

| VListbox    | Description                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| `model`     | Value binding, listbox will in **multiple** mode if model `isArray()`.                                                   |
| `clearable` | While in single option mode, select the same option will unselect it.                                                    |
| `magnetic`  | If `false`, keyboard `nav()` won't update the model. default to `true`, turn it off if the model value is being watched. |
| `options`   | Listbox inputs support any type of value, support one level grouping.                                                    |
| `disabled`  |                                                                                                                          |
| `listbox`   | Omit all other props.                                                                                                    |

| Listbox API                            | Description                                                                                                                  |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `id`                                   | The `id` for creating `aria-activedescendant` to indicate current focused option.                                            |
| `multi`                                | model `isArray()`                                                                                                            |
| `tree`                                 | Contains the original (grouped) hierarchy and extra info to rendering the UI.                                                |
| `options`                              | List of options after flatten and normalized, which are objects with `value` property.                                       |
| `current`                              | Current focuing option index (after options are flatted)                                                                     |
| `nav(delta:number, circular?:boolean)` | Move focus based on the delta number, skipping `disabled` options. If `circular`, `nav()` will across two edges like radios. |
| `input(...values:any[])`               | Toggle selection for value(s). Will validate `disabled` state. Passing `listbox` itself will toggle current value.           |
