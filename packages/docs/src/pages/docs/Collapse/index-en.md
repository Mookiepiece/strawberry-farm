## Collapse

Animation Component

:::demo{basic}

### Individual Panel

Cache `children` nodes for `0.3s`, an alternative way to trigger animation is set `children` to `null`.

:::

### DOM

`div`

### Note

If your panel has fixed height, then `css transition` is better, otherwise you need to write `js` like this component.

Bootstrap 和 W3Schools uses `scrollHeight`.

- [Bootstrap: collapse.js](https://github.com/twbs/bootstrap/blob/main/js/src/collapse.js#L202)
- [W3schools: Collapse ](https://www.w3schools.com/howto/howto_js_collapsible.asp)

`height: 0` won't affect calculated `scrollHeight` and may cause glitches, same does `margin collapsing`.

A tricky alternative way is use `max-height` instead of `height`

- [Toggle Collapse - Animate Height (pure JS) ](https://codepen.io/davidcochran/pen/RNOOEO)
