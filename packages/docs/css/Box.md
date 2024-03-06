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

| Class  | CSS                                            |
| ------ | ---------------------------------------------- |
| `mt-1` | `margin-top: var(--1)`                         |
| `mr-1` | `margin-right: var(--1)`                       |
| `mb-1` | `margin-bottom: var(--1)`                      |
| `ml-1` | `margin-left: var(--1)`                        |
| `mx-1` | `margin-right: var(--1); margin-left: var(--1)` |
| `my-1` | `margin-top: var(--1); margin-bottom: var(--1)` |
| `m-1` | `margin-top: var(--1); margin-right: var(--1); margin-bottom: var(--1); margin-left: var(--1)`                         |

没有使用 `margin` `margin-inline` `margin-block` 简写是因为多个简写会互相覆盖而无法组合。(e.g. `class="m-1 mr-3"`)

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
