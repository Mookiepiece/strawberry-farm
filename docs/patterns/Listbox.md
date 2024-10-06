# Listbox

Pick option(s) from a list of options. binding `any`.

在一组选项中选择一个或一些。

:::source patterns/VListbox.vue

:::

:::demo patterns/ListboxHL

:::

## Spec

https://www.w3.org/WAI/ARIA/apg/patterns/listbox/

### DOM

```html
<div role="listbox">
  <div role="option"></div>
  <div role="group">
    <h6>Title</h6>
    <div role="option"></div>
  </div>
</div>
```

### Command List

| Command List                                                                      |                                                                            |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| <vp-kbd k="up" /> / <vp-kbd k="left" />                                           | Navigates to prev. Add current option and remove other selection.          |
| <vp-kbd k="down" /> / <vp-kbd k="right" />                                        | Navigates to next. Add current option and remove other selection.          |
| <vp-kbd k="Home" />                                                               | Navigates to the beginning. Add current option and remove other selection. |
| <vp-kbd k="End" />                                                                | Navigates to the end. Add current option and remove other selection.       |
| <vp-kbd k="Ctrl+up" /> / <vp-kbd k="Ctrl+left" />                                 | Navigates to prev.                                                         |
| <vp-kbd k="Ctrl+down" /> / <vp-kbd k="Ctrl+right" />                              | Navigates to next.                                                         |
| <vp-kbd k="Ctrl+Home" />                                                          | Navigates to the beginning.                                                |
| <vp-kbd k="Ctrl+End" />                                                           | Navigates to the end.                                                      |
| <vp-kbd k="Shift+up" /> / <vp-kbd k="Shift+left" /> / <vp-kbd k="Shift+Home" />   | Add options while navigation.                                              |
| <vp-kbd k="Shift+down" /> / <vp-kbd k="Shift+right" /> / <vp-kbd k="Shift+End" /> | Add options while navigation.                                              |
| <vp-kbd k="Space" />                                                              | Toggle current option. `toggle(value)`                                     |
| <vp-kbd k="m0" />                                                                 | Add target option and remove other selection.                              |
| <vp-kbd k="Ctrl+m0" />                                                            | Toggle target option.                                                      |
| <vp-kbd k="Shift+m0" />                                                           | Add options between target and current option.                             |
| <vp-kbd k="Enter" />                                                              | current.                                                                   |

## Basics

Listbox options input supports **any** type of option values, values are `key`s (`Symbol || (typeof value + value)`).

Listbox can have **multiple** selection when `model` `Array.isArray()`.

Listbox options input supports one level **grouping**.

### Listbox

This is an simple styled example, see how it handles keyboard events and <vp-kbd k="Ctrl" /> and <vp-kbd k="Shift" />.

:::demo patterns/ListboxBasic

:::

## API Reference

| VListbox    | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| `model`     | Value binding, listbox will in **multiple** mode if model `Array.isArray()`. |
| `clearable` | While in single option mode, select the same option will unselect it.        |
| `options`   | Listbox inputs support any type of value, support one level grouping.        |
| `disabled`  |                                                                              |
| `listbox`   | Omit all other props.                                                        |

| Listbox API                            | Description                                                                                                                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                   | The `id` for creating `aria-activedescendant` to indicate current focused option.                                                                                                                |
| `multi`                                | model `Array.isArray()`                                                                                                                                                                          |
| `tree`                                 | Contains the original (grouped) hierarchy and extra info to rendering the UI.                                                                                                                    |
| `options`                              | List of options after flatten and normalized, which are objects with `value` property.                                                                                                           |
| `current`                              | Current focuing option index (after options are flatted)                                                                                                                                         |
| `nav(delta:number, circular?:boolean)` | Move focus based on the delta number, skipping `disabled` options. If `circular`, `nav()` will across two edges like radios. delta can be `-1`(prev) `1`(next) `-Infinity`(Home) `Infinity`(End) |
| `input(...values:any[])`               | Toggle selection for value(s). Will validate `disabled` state. Passing `listbox` itself will toggle current value.                                                                               |

| Listbox EX API for View                                                              | Description                                                                                 |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `handlePoinerdown(e: MouseEvent, i: ListboxLeaf, opt?: { magnetic?: boolean })`      | Handle Pointer Events, <vp-kbd k="Shift" /> and <vp-kbd k="Ctrl" /> have different behavior |
| `handleKeydown(e: KeyboardEvent, opt?: { circular?: boolean; magnetic?: boolean; })` | Handle Keydown Events, <vp-kbd k="Shift" /> and <vp-kbd k="Ctrl" /> have different behavior |
