# Sizing

本章节探讨在设计和应用 CSS 时经常会遇到尺寸和预期的想法不匹配的问题。


### Button


::: details HTML 的 `<button />` 元素在具有 `display:block` 时其宽度并不延长，其原因是 `<button />` 的默认宽度是 `width: fit-content`
[我在 Stackflow 的回答](https://stackoverflow.com/questions/9699039/button-with-displayblock-not-stretched/60001153#60001153)

同时 `<button />` 若只包含文字，其文字默认垂直居中，也包含在了定义里。
:::

```html
<button style="display: block">1</button>
<button style="width: 100%">1</button>
```

<button style="display: block">1</button>
<button style="width: 100%">1</button>

### Input

详见 Form 章节。
