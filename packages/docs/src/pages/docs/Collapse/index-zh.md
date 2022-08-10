## Collapse 折叠面板

Animation Component

:::demo{basic}

### 独立面板

能够缓存 `children` 节点 `0.3s`， 一个可选的触发方式是将 `children` 变为 `falsy`。

:::

### DOM

`div`

### 原理

若面板定高，`css transition`就可以了，面板不定高要像这样利用`js`提前一帧设置高度。

Bootstrap 和 W3Schools 使用了 `scrollHeight` 。

- [Bootstrap: collapse.js](https://github.com/twbs/bootstrap/blob/main/js/src/collapse.js#L202)
- [W3schools: Collapse ](https://www.w3schools.com/howto/howto_js_collapsible.asp)

子元素设置了 `height:0`，`scrollHeight` 依旧会将实际高度纳入计算，以及可能因为 `margin collapsing` 现象子元素设置了`margin`导致动画断层。
新建[块格式化上下文](https://zhuanlan.zhihu.com/p/131402341)可以解决部分问题，给 panel 设置 `overflow:hidden` 就可以了

额外的：另一个投机取巧的方法是设置 `max-height` 代替 `height`, 但是可以看到明显的延迟，因为 max-height 总是一个溢出的很高的值，降低到本体的高度还是需要时间的

- [Toggle Collapse - Animate Height (pure JS) ](https://codepen.io/davidcochran/pen/RNOOEO)
