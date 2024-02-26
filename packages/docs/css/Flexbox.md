# Flexbox

## Flex Container

用一个类名同时定义多个属性，仅三个主要类名。

| Method         | Example  | CSS                              |
| -------------- | -------- | -------------------------------- |
| Direction      | `[A]`    | `display`, `flex-direction`      |
| Inline         | `[FS]`   | `align-items`, `justify-content` |
| Multiple lines | `[[+S]]` | `align-content`, `flex-wrap`     |

在本页中，表格中加粗的一行代表默认值。

### 方向

参考 XBOX 控制器的键位。

|     | `flex` |         |     |     | `inline-flex` |         |
| --- | :----: | ------- | --- | --- | :-----------: | ------- |
|     |  [Y]   |         |     |     |      [Y]      |         |
| [X] |        | **[B]** |     | [X] |               | **[b]** |
|     |  [A]   |         |     |     |      [a]      |         |

:::demo css/Flexbox1
:::

### 单行定位

参考 place-items 语法，align 在前。

```
place-items = 
  <'align-items'> <'justify-items'>?  
```

`align-items` 的有效值如下表：

|       | CSS Value   | Comment  |
| ----- | ----------- | -------- |
| S     | flex-start  | Start    |
| C     | center      | Center   |
| E     | flex-end    | End      |
| **F** | **stretch** | **Full** |
| B     | baseline    | Baseline |

:::demo css/Flexbox2
:::

`justify-content` 的有效值如下表：

|       | CSS Value      | Comment     |
| ----- | -------------- | ----------- |
| **S** | **flex-start** | **Start**   |
| C     | center         | Center      |
| E     | flex-end       | End         |
| 0     | space-between  | 0/2 to edge |
| 1     | space-evenly   | 1/2 to edge |
| 2     | space-around   | 2/2 to edge |

:::demo css/Flexbox3
:::


### 多行定位

`flex-wrap` 具有 `no-wrap` `wrap` `wrap-reverse` 三种情况，意味着我们需要支持反方向。

|          |                           |
| -------- | ------------------------- |
| `[[+S]]` | `flex-wrap: wrap`         |
| `[[-S]]` | `flex-wrap: wrap-reverse` |

若不启动此标志位，则默认不换行。

`ailgn-content` 的有效值如下表：

|       | CSS Value     | Comment     |
| ----- | ------------- | ----------- |
| S     | flex-start    | Start       |
| C     | center        | Center      |
| E     | flex-end      | End         |
| 0     | space-between | 0/2 to edge |
| 1     | space-evenly  | 1/2 to edge |
| 2     | space-around  | 2/2 to edge |
| **F** | **stretch**   | **Full**    |

:::demo css/Flexbox4
:::

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

