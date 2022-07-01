## Collapse

:::demo{individual}

### Individual Panel

Cache `children` nodes for `0.3s`, an alternative way to trigger animation is set `children` to `null`.

:::

### DOM

`div`

### Note

If your panel has fixed height, then `css transition` is better, otherwise you need `js` -> this component.

Bootstrap 和 W3Schools uses `scrollHeight` , It's value is only related to what content it contains.

- [Bootstrap: collapse.js](https://github.com/twbs/bootstrap/blob/main/js/src/collapse.js#L202)
- [W3schools: Collapse ](https://www.w3schools.com/howto/howto_js_collapsible.asp)

if child is set to `height: 0`, we still got normal `scrollHeight` which is wrong. and `margin` may does the same due to `margin collapse`。
You should establish a new `BFC` for the collapse panel, TL;DR `overflow:hidden`.

A tricky alternative way is use `max-height` instead of `height`

- [Toggle Collapse - Animate Height (pure JS) ](https://codepen.io/davidcochran/pen/RNOOEO)
