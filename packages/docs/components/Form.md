# Form

###### Spec

- 未显示字段会在提交时会被自动裁剪。
- 搬运 [`react-hook-form`](https://www.npmjs.com/package/react-hook-form) 的 tsd 为字段定义提供类型推导。
- 基于一个完全重写且优化的 [`async-validator`](https://github.com/yiminghe/async-validator) 异步校验器，在表单定义字段时能对 `valdator` 的参数提供类型推导。

:::details 更多建议

- 上文所述的 “未显示字段” 即 `<VFormItem />` 未渲染或正在淡出，即 `v-if` or `:is(.v-leave-active *)` 可能纳入考虑？不需要裁剪的字段可以使用 `input[type=hidden]` 等各种方式，只保证 `<VFormItem />` 存在即可。
- 为支持渲染在表单外部的复杂校验规则，如果真实 DOM 存在任何具有 `[data-invalid]` 属性且不满足 `:is(.v-leave-active *)` 的元素，`VForm` 会阻止提交。并尝试通过 DOM API 聚焦它所属的 `<VFormItem />`。例：`<div hidden data-invalid />`。
- 泛型只限制输入值，而输出值由于存在修剪功能不能保证。
- `<VFormItem />` 不是泛型组件，大多数和类型推导相关的功能都应该在脚本里处理。
- 上述所有的聚焦行为不仅包括 `Element.focus()`，还包括 `Element.scrollIntoView()`。聚焦会尝试查找引用的 `focus()` 函数（针对 Input 的优化，必须用 `div` 包住 `<input />` 实现布局），如果没有，则会调用 `el`，自定义组件必须支持 `el`。
- HTML 标准规定 `<form />` 元素不能嵌套（可以用对话框（ `<Teleport to="body" />` ）将业务逻辑拆分以避免嵌套）
- HTML `<form />` 元素不会提交 `disabled` 的控件（`react-hook-form` 也是这么处理的），然而在 `strawberry-farm` 里， 只有不可见控件的值才会被裁剪。这种处理比较主观，但是如果用 `readonly` 替代，诸如 `<select>` `[type="radio"]` `[type="checkbox"]` 反而不支持这个 `readonly` 属性，真是鸡肋，所以还是按照可见即提交吧，毕竟这个年头很难见到原生 HTML `<form />` 发起真正的提交了。

- 取决于自定义控件，需要支持 <kbd>Enter</kbd> 向上查找表单并发起提交，因为这是 HTML `<form />` 的默认行为。

> 太长不看: **添加 submit 按钮即可支持隐式提交表单,即支持回车键提交**
>
> 4.10.21.2 Implicit submission
> A form element's default button is the first submit button in tree order whose form owner is that form element.
>
> If the user agent supports letting the user submit a form implicitly (for example, on some platforms hitting the "enter" key while a text control is focused implicitly submits the form), then doing so for a form, whose default button has activation behavior and is not disabled, must cause the user agent to fire a click event at that default button.
>
> There are pages on the web that are only usable if there is a way to implicitly submit forms, so user agents are strongly encouraged to support this.
>
> If the form has no submit button, then the implicit submission mechanism must do nothing if the form has more than one field that blocks implicit submission, and must submit the form element from the form element itself otherwise.
>
> For the purpose of the previous paragraph, an element is a field that blocks implicit submission of a form element if it is an input element whose form owner is that form element and whose type attribute is in one of the following states: Text, Search, URL, Telephone, Email, Password, Date, Month, Week, Time, Local Date and Time, Number
>
> [HTML Spec form-control-infrastructure.implicit-submission](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#implicit-submission)
>
> [The Enter Key should Submit Forms, Stop Suppressing it](https://www.tjvantoll.com/2013/01/01/enter-should-submit-forms-stop-messing-with-that/)

> W3C 标准中有如下规定：
>
> When there is only one single-line text input field in a form, the user agent should accept Enter in that field as a request to submit the form.
>
> 即：当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 el-form 标签上添加 @submit.native.prevent。
>
> https://element-plus.org/#/zh-CN/component/form

:::

:::demo components/Form
:::

### Sign up

:::demo components/FormSignup
:::
