# Typography

:::demo design/Typography
:::

## Font Presets

| Class                      | `font-size`       | 2.0x Line Height | **1.6x (default)** | 1.2x Line Height |
| -------------------------- | ----------------- | ---------------- | ------------------ | ---------------- |
| <span class="h1">h1</span> | `font-size: 28px` | **56px**         | **44.8px**         | **33.6px**       |
| <span class="h2">h2</span> | `font-size: 24px` | **48px**         | **38.4px**         | 28.8px           |
| <span class="h3">h3</span> | `font-size: 20px` | **40px**         | **32px**           | 24px             |
| <span class="f1">f1</span> | `font-size: 16px` | **32px**         | 25.6px             | 19.2px           |
| <span class="f2">f2</span> | `font-size: 14px` | 28px             | 22.4px             | 16.8px           |
| <span class="f3">f3</span> | `font-size: 12px` | 24px             | 19.2px             | 14.4px           |

- 行高超过30px在表格里加粗。

Note: 微信的正文是17px；微博正文是 15px。

## Line Height Modifier

文章行高为1.6，对于非文章元素，通过添加后缀 i 以表示行高需要缩小。

| Class       | Value              |
| ----------- | ------------------ |
| `f1-1`      | `line-height: 2`   |
| `f1` `f1-2` | `line-height: 1.6` |
| `f1-3`      | `line-height: 1.2` |
