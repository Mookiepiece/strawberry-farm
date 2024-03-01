# Modal

::: details 注：没有锁定 body 滚动条，如果要使用，则使用环境不要让 body 出现滚动条。
滚动条消失会引起视口宽度突变，就算能计算出滚动条的高度给 body 右侧加 margin hack，`position:fixed` 这种基于视口定位的元素仍然会跳位置。
:::

::: details Curtain

火狐下任何有滚动条的元素都能被聚焦，也就是 Modal 外层的 Curtain 可能会被聚焦。

`strawberry-farm` 的 `trap` 函数在判断 `compareDocumentPosition` 时也没有处理包含和被包含的情况。

属于合理的浏览器行为差异。

`@keydown.esc` 也是放在幕布上的。

:::


:::demo html/Modal
:::
