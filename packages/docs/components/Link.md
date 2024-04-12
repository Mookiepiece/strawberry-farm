# Button

### Spec

- `<VButton />` 默认 `[type="button"]`，普通按钮如果不指定，放在 `<form />` 里默认能把表单提交了。
- Trunk 应该放在别的地方介绍，作用是提升主干的边距，在搭配图标时能让中间的文字重心更居中一些，是很常见的做法。

#### DOM

```html
<button type="VButton">
  <slot name="icon"></slot>
  <div v-if="$slots.default" class="Trunk">
    <slot />
  </div>
  <slot name="suffix"></slot>
</button>
```

:::demo components/Button
:::
