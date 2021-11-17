## Collapse 折叠面板

:::demo{individual}

### 独立面板

只用 Panel 提供动画效果

:::

### 接口索引

| Collapse.Panel Property | Description        | Type      |
| ----------------------- | ------------------ | --------- |
| active:required         | visibility control | `boolean` |

\*除上述属性，折叠面板仍继承原生 `<div>` 属性

### 原理

如果你的面板有设置`height`，那么传统的动画方案就能实现。但面板是没有自定义设置高度属性时默认是 `height:auto`，此时动画不生效，所以应提前一帧设置高度。

Bootstrap 和 W3Schools 使用了 `scrollHeight` ，它的值只和内部内容有关，内容不变它也保持不变。
所以我们的折叠面板的最大值是固定的 `scrollHeight` ，最小值也是固定的 0。
试想这种情况，折叠到一半突然点击反折，因为折叠到一半的时候 `clientHeight` 和 `offsetHeight` 都是当前值，而通过永远不变的 `scrollHeight` 可以知道最大值并且以此折返。

哪怕子元素设置了`height:0`，`scrollHeight` 依旧会将子元素的实际高度纳入计算，
以及可能会把子元素的下`margin`纳入计算导致出现一个`margin`距离的动画断层，
解决方法是新建[块格式化上下文 👍](https://zhuanlan.zhihu.com/p/131402341)，给 panel 设置 `overflow:hidden` 就可以了

注意：子元素存在负值的`margin`&`padding`会导致 `scrollHeight` 计算出错

- [Bootstrap: collapse.js](https://github.com/twbs/bootstrap/blob/main/js/src/collapse.js#L202)
- [W3schools: Collapse 👍](https://www.w3schools.com/howto/howto_js_collapsible.asp)

额外的：另一个投机取巧的方法是设置 `max-height` 代替 `height`, 但是可以看到明显的延迟，因为 max-height 总是一个溢出的很高的值，降低到本体的高度还是需要时间的

- [Toggle Collapse - Animate Height (pure JS) 👍](https://codepen.io/davidcochran/pen/RNOOEO)
