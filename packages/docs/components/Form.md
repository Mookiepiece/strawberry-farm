# Form

###### Concern

- HTML 标准规定 `<form />` 元素不能嵌套（放对话框里不会导致嵌套所以可行）

###### Spec

- 在任意字段 <kbd>Enter</kbd> 可以提交整个 Form
- 校验失败时会聚焦到第一个失败的字段（字段被禁用会导致聚焦失败，使用者需要保证能聚焦）（或者内部实现弹吐司提示往上看）
- 搬运 `react-hook-form` 的 tsd 为字段定义提供类型推导。
- 基于一个优化的 `async-validator` 异步校验器。
- 未绑定字段（`<FormItem />` 未渲染，即 `v-if` or `:is(.v-leave-active *)` 可能纳入考虑？ ）会在提交时被自动裁剪。不需要裁剪的字段可以使用 `input[type=hidden]` `v-show` `[hidden]`。

###### 接入响应式系统

- @vue/reactivity
  - 条件属性：使用 `computed (vue)`
  - 触发器：使用 `watch/watchEffect/effect (vue)`
- signal （暂未支持）
  - （饼）条件属性：使用 `computed`
  - （饼）触发器：使用 `effect`
- 无响应式系统 （暂未支持）
  - （饼）条件属性：使用 `{ [Symbol]: () => { } }`
  - （饼）触发器：使用 `callback`



###### 结束

:::demo components/Form
:::
