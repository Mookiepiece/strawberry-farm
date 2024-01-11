# Flexbox

## Flex Container

用一个类名同时定义多个属性，仅三个主要类名。

| Method         | Example | CSS                             |
| -------------- | ------- | ------------------------------- |
| Direction      | `[A]`   | `display`, `flex-direction`     |
| Inline         | `[SC]`  | `justify-content`,`align-items` |
| Multiple lines | `[[]S]` | `align-content`, `flex-wrap`    |

在本页中，表格中加粗的一行代表默认值。

### 方向

参考 XBOX 的键位。

|     | `flex` |         |     |     | `inline-flex` |         |
| --- | :----: | ------- | --- | --- | :-----------: | ------- |
|     |  [Y]   |         |     |     |      [y]      |         |
| [X] |        | **[B]** |     | [x] |               | **[b]** |
|     |  [A]   |         |     |     |      [a]      |         |


:::demo css/Flexbox1
:::

### 单行定位

`justify-content` 的有效值如下表：

|       | CSS Value      | Comment               |
| ----- | -------------- | --------------------- |
| **S** | **flex-start** | **Start**             |
| C     | center         | Center                |
| E     | flex-end       | End                   |
| 0     | space-between  | x0 edge gap (base: 2) |
| 1     | space-evenly   | x1 edge gap (base: 2) |
| 2     | space-around   | x2 edge gap (base: 2) |

:::demo css/Flexbox2
:::

`align-items` 的有效值如下表：

|       | CSS Value   | Comment  |
| ----- | ----------- | -------- |
| S     | flex-start  | Start    |
| C     | center      | Center   |
| E     | flex-end    | End      |
| **F** | **stretch** | **Full** |
| B     | baseline    | Baseline |

:::demo css/Flexbox3
:::

### 多行定位

`flex-wrap` 具有 `no-wrap` `wrap` `wrap-reverse` 三种情况，意味着我们需要支持反方向。

|         |                           |
| ------- | ------------------------- |
| `[[]S]` | `flex-wrap: wrap`         |
| `[S[]]` | `flex-wrap: wrap-reverse` |

若不启动此标志位，则默认不换行。

`ailgn-content` 的有效值如下表：

|       | CSS Value     | Comment               |
| ----- | ------------- | --------------------- |
| S     | flex-start    | Start                 |
| C     | center        | Center                |
| E     | flex-end      | End                   |
| 0     | space-between | x0 edge gap (base: 2) |
| 1     | space-evenly  | x1 edge gap (base: 2) |
| 2     | space-around  | x2 edge gap (base: 2) |
| **F** | **stretch**   | **Full**              |

## Flex Item

| Class  | CSS              |
| ------ | ---------------- |
| `[+0]` | `flex-grow: 0`   |
| `[+1]` |                  |
| `[+2]` |                  |
| `[+3]` |                  |
| `[+4]` |                  |
| `[+5]` |                  |
| `[-0]` | `flex-shrink: 0` |
| `[-1]` |                  |
| `[-2]` |                  |
| `[-3]` |                  |
| `[-4]` |                  |
| `[-5]` |                  |
