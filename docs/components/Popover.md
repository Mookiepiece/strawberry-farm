# Popover

### View

### DOM

```html
<body>
  <div data-pop>
    <div data-pop-box><slot name="popper" /></div>
  </div>
</body>
```

- `[data-pop]` 用于定位。
- `[data-pop-box]` 用于应用 `transform` 动画，因为 `transform` 会影响到最终的 `Rect` 的大小，所以不能用于 `[data-pop]` 上，因此 `[data-pop]` 是一个无样式元素，且 `--max-height` （由 `VSelect` `autoHeight` 中间件产生） 的作用目标是 `[data-pop-box]`。且判断 `flip` 基于 `[data-pop-box]` 的 `scrollHeight`。

:::demo components/Popover
:::
