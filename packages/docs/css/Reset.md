# Reset

::: source/

:::

本章节解释 `strawberry-farm` 如何重置样式表。

其它替代：https://unocss.dev/guide/style-reset

### Box Sizing

/

### Img

```scss
img {
  max-width: 100%; // For images to not be able to exceed their container
  max-height: 100%;
  object-fit: contain;
}
```

考虑以下示例：

```html
<div style="width: 50px; border: 5px dashed #8883">
  <img src="../pic256.jpg" />
</div>
```

<div style="width: 50px; border: 5px dashed #8883">
  <img src="../pic256.jpg" />
</div>

如果重置为默认值，则图片元素会越出容器。

```html
<div style="width: 50px; border: 5px dashed #8883">
  <img style="max-width: initial" src="../pic256.jpg" />
</div>
```

<div style="width: 50px; border: 5px dashed #8883">
  <img style="max-width: initial" src="../pic256.jpg" />
</div>

注： `<video />` 元素同理。

### Pre

`<pre />` 标签拥有特殊的格式化规则，优先考虑使用这个标签。

### Table

/

### Typography

/

### Form

/