# Positioning

距离变量

|       |                                                                       |
| ----- | --------------------------------------------------------------------- |
| `{?}` | `position: ?;`<br />` --x: 0;`<br />` --y: 0;`<br />` --xy: 0;`<br /> |

基本位置

|       |                      |
| ----- | -------------------- |
| `{+}` | `position: relative` |
| `{*}` | `position: absolute` |
| `{&}` | `position: sticky`   |
| `{.}` | `position: fixed`    |

距离方向

|         |                                                                                                 |
| ------- | ----------------------------------------------------------------------------------------------- |
| `{*}`   | `left: 50%;`<br />`top: 50%;`<br />`transform: translate(-50%, -50%);`                          |
| `\{*}`  | `left: calc(0 + var(--x) + var(--xy));`<br />`top: calc(0 + var(--y) + var(--xy));`             |
| `-{*}`  | `left: calc(0 + var(--x) + var(--xy));`<br />`top: 50%;`<br />`transform: translateY(-50%);`    |
| `/{*}`  | `left: calc(0 + var(--x) + var(--xy));`<br />`bottom: calc(0 + var(--y) + var(--xy));`          |
| `\{*}/` | `left: 50%;`<br />`transform: translateX(-50%);`<br />`bottom: calc(0 + var(--y) + var(--xy));` |
| `{*}\`  | `right: calc(0 + var(--x) + var(--xy));`<br />`bottom: calc(0 + var(--y) + var(--xy));`         |
| `{*}-`  | `right: calc(0 + var(--x) + var(--xy));`<br />`top: 50%;`<br />`transform: translateY(-50%);`   |
| `{*}/`  | `right: calc(0 + var(--x) + var(--xy));`<br />`top: calc(0 + var(--y) + var(--xy));`            |
| `/{*}\` | `left: 50%;`<br />`transform: translateX(-50%);`<br />`top: calc(0 + var(--y) + var(--xy));`    |

```txt

\{*} \{*}/ {*}/

-{*} {*}  {*}-

/{*} /{*}\ {*}\

```
