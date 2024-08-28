# 盒模型 Box

本章节不提供示例，参考 Design -> Sizing 一节

## 一般盒模型

### 盒模型总览

| Class | CSS            |
| ----- | -------------- |
| `m-1` | `margin: 5px`  |
| `p-1` | `padding: 5px` |

### 盒模型方向修饰

和 Emmet 差不多。

| Class  | CSS                  |
| ------ | -------------------- |
| `m-1`  | `margin: 5px`        |
| `mx-1` | `margin-inline: 5px` |
| `my-1` | `margin-block: 5px`  |
| `mt-1` | `margin-top: 5px`    |
| `mr-1` | `margin-right: 5px`  |
| `mb-1` | `margin-bottom: 5px` |
| `ml-1` | `margin-left: 5px`   |

定义顺序为 `['m',['mx','my'],['mt','mr','mb','ml']]`，以保证后声明的属性能与前一项属性组合使用而不被覆盖 e.g. `m-1 mx-2 mt-3`。

### 盒模型数值修饰

| Class     | CSS                |
| --------- | ------------------ |
| `mt-auto` | `margin-top: auto` |
| `mt-0`    | `margin-top: 0`    |
| `mt-1`    | `margin-top: 5px`  |
| `mt-2`    | `margin-top: 10px` |
| `mt-3`    | `margin-top: 15px` |
| `mt-4`    | `margin-top: 20px` |
| `mt-5`    | `margin-top: 25px` |
| `mt-6`    | `margin-top: 30px` |
| `mt-7`    | `margin-top: 35px` |
| `mt-8`    | `margin-top: 40px` |
