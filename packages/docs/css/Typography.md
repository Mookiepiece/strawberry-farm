# Typography

## Text Align

参考 Github Markdown Extension 表格语法，实现文本对齐。

| Class  | CSS                  |
| ------ | -------------------- |
| `[:-]` | `text-align: start`  |
| `[--]` | `text-align: center` |
| `[-:]` | `text-align: end`    |

```html
<div class="[:-]">[:-]</div>
<div class="[--]">[--]</div>
<div class="[-:]">[-:]</div>
```

<div class="🪟">
  <div class="[:-]">[:-]</div>
  <div class="[--]">[--]</div>
  <div class="[-:]">[-:]</div>
</div>

## Text Overflow

| Class | CSS                                                                         |
| ----- | --------------------------------------------------------------------------- |
| `...` | `overflow: hidden;`<br>`text-overflow: ellipsis;`<br>`white-space: nowrap;` |

```html {3}
<div class="mini">
  <div>Lorem ipsum.</div>
  <div class="... 🦄">Lorem ipsum.</div>
</div>
```

<div class="🪟">
  <div class="mini">
    <div>Lorem ipsum.</div>
    <div class="... 🦄">Lorem ipsum.</div>
  </div>
</div>

打点会触发 volar css 代码提示。按左方向键退出提示以继续打点。

确保目标是块容器才能设置 `overflow` 属性。

> CSS `overflow` Applies to **Block**-containers, flex containers, and grid containers.

### The Automatic Minimum Size of Flex Items

Flex Items 和 Grid Items 默认的 `min-width:auto`、 `min-height:auto` 等同于 `min-content` 而不是标准的 `0`，这会导致一些情况溢出。

它们并非和已有的流式布局的设计冲突，因为是这两种布局的出现才有真正意义的横向布局，这是流式布局的百分比宽度栅格所不可比拟的。

> To provide a more reasonable default minimum size for flex items, the used value of a main axis automatic minimum size on a flex item that is not a **scroll container** is a content-based minimum size; for **scroll container**s the automatic minimum size is zero, as usual.
>
> [Why don't flex items shrink past content size?](https://stackoverflow.com/questions/31867316/Show-can-i-force-a-nested-flexbox-element-to-shrink-and-display-a-scrollbar-when/31867656#31867656)
>
> https://www.w3.org/TR/css-flexbox-1/#min-size-auto

---

::: details 注： `scroll container` 即 `overflow: hidden | scroll | auto`，包括 `hidden`

> [hidden: the box is therefore still a scroll container.](https://www.w3.org/TR/css-overflow-3/#valdef-overflow-hidden)

:::

::: details 可能溢出的情况包括单个字符过大，过长文本，替换元素(`<input size="500">`)。

- `<input size="500">` 在流式布局下也会溢出其包含块。
- `<input size="500" style="max-width: 100%">` 在流式布局下**不会**溢出其包含块，在嵌套的 flexbox item 里则**会溢出**其包含块。显式设置包含块的 `min-width: 0` 后显示正常。
- `<img>` (默认样式 `max-width: auto`) 在流式布局下也会溢出其包含块。故 `strawberry-farm` 的 CSS 重置引用了主流实现即设置为 `max-width: 100%`。
- `<img style="max-width: 100%">` 在流式布局下**不会**溢出其包含块，在嵌套的 flexbox item 里也**不会**溢出其包含块。

:::

---

下例第二项展示了 `flexbox` 在嵌套 `<div>` 而溢出的现象，可以看到我们的类名`...`失效了：

```html {6}
<div class="[B] mini">
  <div class="... 🩷">Text Overflow</div>
</div>
<div class="[B] mini">
  <div>
    <div class="... 🩷">Text Overflow</div>
  </div>
</div>
<div class="[B] mini">
  <input />
</div>
<div class="[B] mini">
  <div>
    <input />
  </div>
</div>
```

<div class="🪟">
  <div class="[B] mini">
    <div class="... 🩷">Text Overflow</div>
  </div>
  <div class="[B] mini">
    <div>
      <div class="... 🩷">Text Overflow</div>
    </div>
  </div>
  <div class="[B] mini">
    <input />
  </div>
  <div class="[B] mini">
    <div>
      <input />
    </div>
  </div>
</div>

显式设置了 Flex Item `min-width: 0` / `max-width: 100%` 或 `overflow: hidden` 后不再溢出：

```html {2,7,12,15-16}
<div class="[B] mini">
  <div style="min-width: 0">
    <div class="... 🩷">Text Overflow</div>
  </div>
</div>
<div class="[B] mini">
  <div style="overflow: hidden">
    <div class="... 🩷">Text Overflow</div>
  </div>
</div>
<div class="[B] mini">
  <input style="min-width: 0" />
</div>
<div class="[B] mini">
  <div style="min-width: 0">
    <input style="max-width: 100%" />
  </div>
</div>
```

<div class="🪟">
  <div class="[B] mini">
    <div style="min-width: 0">
      <div class="... 🩷">Text Overflow</div>
    </div>
  </div>
  <div class="[B] mini">
    <div style="overflow: hidden">
      <div class="... 🩷">Text Overflow</div>
    </div>
  </div>
  <div class="[B] mini">
    <input style="min-width: 0" />
  </div>
  <div class="[B] mini">
    <div style="min-width: 0">
      <input style="max-width: 100%" />
    </div>
  </div>
</div>

下例展示了 `grid` 子元素的溢出现象，`justify-self` 会使得宽高被设置为 `fit-content`，解决方法是设置`max-width: 100%` `width: 100%`而并非上文的 `min-width: 0` 或 `overflow: hidden`：

这个设定反映了现代 CSS 各属性仍然不够正交的毛病。

> Values other than stretch cause a width/height of auto to be treated as fit-content.
> https://www.w3.org/TR/css-align-3/#propdef-justify-self

::: details 在 Grid Layout 中，`100%` 代表其所在格子的宽度。

> Percentages are resolved against the width/height, as appropriate, of the box’s containing block.
> https://www.w3.org/TR/css-sizing-3/#sizing-values
>
> A grid item is sized within the containing block defined by its grid area.
> https://www.w3.org/TR/css-grid-1/#grid-item-sizing

:::

```html {2,6,10}
<div style="display: grid; grid-template-columns: 3fr 1fr; width: 50px;">
  <div class="... 🩷">Text Overflow</div>
  <div>A</div>
</div>
<div style="display: grid; grid-template-columns: 3fr 1fr; width: 50px;">
  <div class="... 🩷" style="justify-self: start;">Text Overflow</div>
  <div>A</div>
</div>
<div style="display: grid; grid-template-columns: 3fr 1fr; width: 50px;">
  <div class="... 🩷" style="justify-self: start; max-width: 100%;">
    Text Overflow
  </div>
  <div>A</div>
</div>
```

<div class="🪟">
  <div style="display: grid; grid-template-columns: 3fr 1fr; width: 50px;">
    <div class="... 🩷">Text Overflow</div>
    <div>A</div>
  </div>
  <div style="display: grid; grid-template-columns: 3fr 1fr; width: 50px;">
    <div class="... 🩷" style="justify-self: start;">Text Overflow</div>
    <div>A</div>
  </div>
  <div style="display: grid; grid-template-columns: 3fr 1fr; width: 50px;">
    <div class="... 🩷" style="justify-self: start; width: 100%;">
      Text Overflow
    </div>
    <div>A</div>
  </div>
</div>

<style scoped>
.mini {
  width: 50px;
  border: 5px dashed #8883;
}
</style>
