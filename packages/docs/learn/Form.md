# Form

<script setup>
import FormInputOfFile from './FormInputOfFile.vue';
</script>

### Text

- W3C定义默认的大小为 20 字符，需要 `width: 100%` （待溯源）
- 表单中只有一个 `input` 时哪怕没有提交按钮，回车时也会发生提交 （待溯源）

```html
<input /> <input style="width:100%; padding: 0" />
```

<input class='[SF]' />
<input class='[SF]' style="width:100%; padding: 0" />

### Radio

- 系统行为：使用键盘上下左右可以在相同 `name` 属性的选项间切换，跳过 `disabled` 元素。
- 系统行为：每当选中下一个元素时，浏览器会滚动至该 `input` 所在位置。
- 系统行为：已经选中的选项点击后不会再发生 `change` 事件。
- 系统行为：回车提交表单。

设计 `Radio` 结构如下：

```html
<label>
  <input type="radio" name="XXX" />
  <slot>Description</slot>
</label>
```

label CSS 关键点

```css
:where(label.\[SF\]) {
  position: relative;
  display: flex;
}
```

- 提供相对定位给 `<input />` 以避免上述浏览器滚动到 `<input />` 元素位置的默认行为使得页面乱跳。
- 提供 flex 布局以在自身具有固定高度时让其内部的 `<slot />` 元素跟着自己撑开。

input CSS 关键点

```css
label.\[SF\] input:where([type='radio'], [type='checkbox'], [type='file']) {
  position: absolute;
  inset: 0;

  width: 1px;
  height: 1px;

  pointer-events: none;
  opacity: 0;
}
```

- 绝对定位以不影响其他元素的布局。
- 缩小自己的大小，由于它是替换元素所以其实并不能缩到 1px， 在 chrome 下是 4px。
- 由于它仍然有大小，需要避免自己被鼠标点击，防止压着其它的绝对定位元素。
- 透明。

#### 样例如下：

:::demo learn/FormInputOfRadio
:::

### File

注意示例使用 `FileReader.prototype.readAsText()` 直接读取非媒体素材的全部内容，故非媒体素材示例限制文件大小仅10M，大文件会卡顿。

Require calling `preventDefault()` on both `dragover` events and `drop` events.

:::demo learn/FormInputOfFile
:::
