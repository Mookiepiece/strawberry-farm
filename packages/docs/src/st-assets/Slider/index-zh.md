## Slider 滑块

如果要写一个你自己的滑块，别忘了添加`touch-action:none`以让触摸屏不要识别手势

### 基本用法

TODO: 添加越界 label 判断

::demo{basic}

### 接口索引

| Slider Property | Description                               | Type                                   |
| --------------- | ----------------------------------------- | -------------------------------------- |
| min             | 默认`0`                                   | `number`                               |
| max             | 默认`100`                                 | `number`                               |
| step            | 步长，默认`1`，设置为 null 以吸附到 label | `number / null`                        |
| labels          | 标签                                      | `{ value: number; label?: ReactNode }` |

\*除上述属性，按钮仍继承原生 `<button>` 属性, 如 `disabled`
