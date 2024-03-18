# Form

###### Concern

- HTML 标准规定 `<form />` 元素不能嵌套（用传送门放对话框里不会导致嵌套所以可行）

###### Spec

- 未显示字段会在提交时会被自动裁剪。
- 搬运 [`react-hook-form`](https://www.npmjs.com/package/react-hook-form) 的 tsd 为字段定义提供类型推导。
- 基于一个完全重写且优化的 [`async-validator`](https://github.com/yiminghe/async-validator) 异步校验器，在表单定义字段时能对 `valdator` 的参数提供类型推导。

:::details 更多建议
  - 使用者的自定义控件需要支持 <kbd>Enter</kbd> 向上查找表单并发起提交，因为这是 HTML `<form />` 的默认行为。
  - 字段被禁用会导致聚焦失败，使用者需要保证出错字段必须能被聚焦。
  - 上文所述的 “未显示字段” 即 `<VFormItem />` 未渲染，即 `v-if` or `:is(.v-leave-active *)` 可能纳入考虑？不需要裁剪的字段可以使用 `input[type=hidden]` `v-show` `[hidden]`。
  - 泛型只限制输入值，而输出值由于存在修剪功能不能保证，可能被修剪的字段需要使用者自己校正类型定义为可空。
  - 目前 (Typescript 5.0) 动态泛型推导必须使用函数，所以会引入类似 `vue` 的 `defineXXX` 语法，用函数包裹定义。且 vue 3.4 当前不支持泛型组件，**故建议多使用 JS 定义字段，少用 `<VFormItem />` 的属性**。
  - `strawberry-farm` 的 `<VFormItem />` 会将 `validator` 的 Range 修饰翻译成 `min` `max-length` `aria-value-min` 等 HTML 原生属性作用在自定义控件上，使用者在实现自定义控件时可以考虑支持。
:::

###### 接入响应式系统

经过思考，由于不同数据格式在响应式系统的运行时方面差异过大，兼容多种格式可能耗费的成本会和重写相当。以下需求放弃：

- @vue/reactivity
  - 条件属性：使用 `computed (vue)`
  - 触发器：使用 `watch/watchEffect/effect (vue)`
- signal （暂未支持）
  - （饼）条件属性：使用 `computed`
  - （饼）触发器：使用 `effect`
- 无响应式系统 （暂未支持）
  - （饼）条件属性：使用 `{ [Symbol]: () => { } }`
  - （饼）触发器：使用 `callback`

:::demo components/Form
:::
