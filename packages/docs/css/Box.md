# 盒模型 Box

本章节不提供示例，参考 Design -> Sizing 一节

## 一般盒模型

### 盒模型总览

| Class | CSS                 |
| ----- | ------------------- |
| `m-1` | `margin: var(--1)`  |
| `p-1` | `padding: var(--1)` |

### 盒模型方向修饰

和 Emmet 差不多。

| Class  | CSS                       |
| ------ | ------------------------- |
| `m-1`  | `margin: var(--1)`        |
| `mx-1` | `margin-inline: var(--1)` |
| `my-1` | `margin-block: var(--1)`  |
| `mt-1` | `margin-top: var(--1)`    |
| `mr-1` | `margin-right: var(--1)`  |
| `mb-1` | `margin-bottom: var(--1)` |
| `ml-1` | `margin-left: var(--1)`   |

定义顺序为 `['m',['mx','my'],['mt','mr','mb','ml']]`，以保证后声明的属性能与前一项属性组合使用而不被覆盖 e.g. `m-1 mx-2 mt-3`。

### 盒模型数值修饰

| Class     | CSS                    |
| --------- | ---------------------- |
| `mt-auto` | `margin-top: auto`     |
| `mt-0`    | `margin-top: var(--0)` |
| `mt-1`    | `margin-top: var(--1)` |
| `mt-2`    | `margin-top: var(--2)` |
| `mt-3`    | `margin-top: var(--3)` |
| `mt-4`    | `margin-top: var(--4)` |
| `mt-5`    | `margin-top: var(--5)` |
| `mt-6`    | `margin-top: var(--6)` |
| `mt-7`    | `margin-top: var(--7)` |
| `mt-8`    | `margin-top: var(--8)` |
