# Select


### Spec
 - `.Positioner` 用于定位。
 - `.PopperBody` 用于应用 `transform` 动画，因为 `transform` 会影响到最终的 `Rect` 的大小，所以不能用于 `.Positioner` 上，因此 `.Positioner` 是一个无样式元素，且 `--max-height` （由 `autoHeight` 中间件产生） 的作用目标是 `PopperBody`。

:::demo components/Select
:::