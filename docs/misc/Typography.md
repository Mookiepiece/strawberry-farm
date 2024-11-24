# Typography

注意：`Emmet` 不支持中括号

## Text Align

Inspired by Github Markdown Extension.

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

<div class="(///)">
  <div class="[:-]">[:-]</div>
  <div class="[--]">[--]</div>
  <div class="[-:]">[-:]</div>
</div>

## Text Overflow

| Class   | CSS                                                                         |
| ------- | --------------------------------------------------------------------------- |
| `[...]` | `overflow: hidden;`<br>`text-overflow: ellipsis;`<br>`white-space: nowrap;` |

```html {3}
<div class="(///)" style="width: 50px">
	<div>Lorem ipsum.</div>
	<div class="[...] 🦄">Lorem ipsum.</div>
</div>
```

<div class="(///)" style="width: 50px">
  <div>Lorem ipsum.</div>
  <div class="[...] 🦄">Lorem ipsum.</div>
</div>

需要括号的一个原因是因为直接打点会触发 volar css 代码提示。

确保目标是块容器才能设置 `overflow` 属性。

> CSS `overflow` Applies to **Block**-containers, flex containers, and grid containers.

<style scoped>
.mini {
 
}
</style>
