## Zustand 状态

`zustand`这个库为`react`兼容外部状态省下了好多事情。但默认的`merge`模式不符合`hooks`时代的直觉。

`strawberry-farm`覆盖了此默认行为，现在默认行为是`replace` 模式。

> `Form`组件和`Versioned Storage`接口都依赖于`Zustand`实现。

### Basic

::demo{basic}
