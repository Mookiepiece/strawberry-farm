<script setup>
import BreakpointsA from './BreakpointsA.vue';
</script>

# Breakpoints

CSS 媒体查询为 vscode 用户片段。

![Breakpoints for VS Code](./Breakpoints.png)

其中，`w` 和 `ww` 为 CSS 预设会考虑支持的断点前缀，具体需参照各页面的介绍。其余仅支持 vscode 用户片段。由于 `w` 已经被使用，“半个 w” 用 v 表示。

宽度断点及常用设备：

| Pixel      | Device                    | Breakpoint | Note             |
| ---------- | ------------------------- | ---------- | ---------------- |
| 320px      | ~~iPhone5~~               |            |                  |
| 360px      | Galaxy S22 (3x)           |            |                  |
| 375px      | iPhone SE (2x)            |            |                  |
| 393px      | iPhone 15 (3x)            |            |                  |
| 430px      | iPhone 15 Pro Max (3x)    |            |                  |
| 444px      |                           | v          |                  |
| 450px      | Desktop Firefox           |            |                  |
| 500px      | Desktop Google Chrome     |            |                  |
| **700px**  |                           | **w**      | **平板分界线**   |
| 744px      | iPad Mini 6 (2x)          |            |                  |
| 768px      | iPad Mini 4 (2x)          |            |                  |
| 1000px     |                           | wv         |                  |
| 1024px     | iPad Mini 4 (2x)          |            |                  |
| 1133px     | iPad Mini 6 (2x)          |            |                  |
| 1280px     | HD                        |            |                  |
| **1300px** |                           | **ww**     | **笔记本分界线** |
| 1366px     | iPad Pro 12.9' (6th) (2x) |            |                  |
| 1366px     | 13' Laptop                |            |                  |
| 1700px     |                           | wwv        |                  |
| 1920px     | FHD                       |            |                  |
| 2560px     | 2K                        |            |                  |

比例图示：

<BreakpointsA />
