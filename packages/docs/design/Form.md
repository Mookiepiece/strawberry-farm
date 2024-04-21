# Form

###### Spec

- 由 `visible: false` 导致的未显示字段会在提交时会被自动裁剪。因此泛型只限制输入值，而不能保证输出值。
- 搬运 [`react-hook-form`](https://www.npmjs.com/package/react-hook-form) 的 tsd 为字段定义提供类型推导。
- 由 [`async-validator`](https://github.com/yiminghe/async-validator) 启发的异步校验器，融入表单定义并可对 `valdator` 的参数提供类型推导。

:::details 更多建议

- `<VFormItem />` 不是泛型组件。
- 空字符串 `''` 视为校验失败。
- HTML 标准规定 `<form />` 元素不能嵌套（可以用（ `<Teleport to="body" />` ）拆分）
- HTML `<form />` 元素不会提交 `disabled` 的控件（`react-hook-form` 也是这么处理的），但在 `strawberry-farm` 里裁剪的只是 `visible: false`。如果用 `readonly` 替代 `disabled`，诸如 `<select>` `[type="radio"]` `[type="checkbox"]` 反而不支持这个 `readonly` 属性，真是鸡肋。
- 取决于自定义控件，可支持 <kbd>Enter</kbd> 向上查找表单并发起提交，因为这是 HTML `<form />` 的默认行为。这部分因使用场景而异，存在争议。比如安卓输入法的回车的提示文本和行为很多都是“下一项”。`<VListbox />` 及衍生组件暂不支持<kbd>Enter</kbd>提交，<kbd>Enter</kbd>的行为是选择。

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

### Sign up

:::demo design/FormSignup
:::
