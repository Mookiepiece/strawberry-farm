# Form

###### Spec

- 未显示字段会在提交时会被自动裁剪。
- 曾受 [`react-hook-form`](https://www.npmjs.com/package/react-hook-form) 的 tsd 启发使用字符串路径推导，但改成树形了。
- 由 [`async-validator`](https://github.com/yiminghe/async-validator) 启发的异步校验器，融入表单定义并可对 `valdator` 的参数提供类型推导。

:::details 更多建议

- 上文所述的 “未显示字段” 即 `<VFormItem />` 未渲染或正在淡出，即 `v-if` or `:is(.v-leave-active *)` 可能纳入考虑？不需要裁剪的字段可使用控件 `input[type=hidden]` 等方式保证 `<VFormItem />` 存在，或可用 `hidden` 类型表示不渲染任何东西但参与提交。
- 泛型只限制输入值，而输出值由于存在修剪功能不能保证。
- `<VFormItem />` 不是泛型组件，大多数和类型推导相关的功能都应该在脚本里处理。这么做相对于设计在放模板里的好处是，如果放模板里，则逻辑会下沉到 `<VFormItem />` 里，导致外层 `FormModel` 实例分发掉数据驱动和泛型提供的功能，丢失的功能包括规则 `rules` 的 `validator` 的类型推导，输入控件的参数配置、双向绑定需要转换为手动绑定（和 `element-plus` 一样绑定两次，表单项一次，控件一次），目前配置在实例上的表单项的错误消息 `message` 的获取和设置。
- `defineHierarchy` 作为接收数组的函数，会按照定义顺序依次渲染字段，如果 `<Form />` 的默认插槽被配置（表单样式高度自定义），则分组功能 `group` 和顺序都不用考虑。尽管 `defineHierarchy` 确实可以直接定义完整的对象结构以避免目前可能导致的忘记定义的情况，但把样式部分放到模板上类型推导仍然是失效的，仍然可能会漏绑定字段。
- 方案2：`defineHierarchy` 直接定义完整的对象结构以避免可能导致的忘记定义的情况，但如果有分组等功能需要，放到自定义模板上类型推导仍然是失效的，仍然可能会漏绑定字段。另一种可选的方式是可以将 `defineHierarchy` 变为接收数组，以实现配置不同的块和自定义顺序，俨然是低代码的做法。由于前者实现起来更方便，故采用前者，低代码做法无法适应通用场景。
- 由于采用 `defineHierarchy` 的方式将项目定义上置，则或无法使用 `<VFormItem />` 的条件渲染优势，当获得 `undefined` 时，控件不会渲染，这也约定了所有控件的空值都应该是 `null`。
- 空字符串 `''` 视为校验失败。
- `<VFormItem />` 可以嵌套，Array Nesting 和 Object Nesting 的区别：Array Nesting 通常类型是 `list`，会渲染一个外层的数组操作框架，例如每个项目的删除按钮和增加按钮，或者排序号。Object Nesting 外层控件类型或可能是 `hidden`。
- 上述所有的聚焦行为不仅包括 `Element.focus()`，还包括 `Element.scrollIntoView()`。聚焦会尝试查找引用的 `focus()` 函数（针对 Input 的优化，必须用 `div` 包住 `<input />` 实现布局），如果没有，则会调用 `el`，自定义组件必须支持 `el`。
- HTML 标准规定 `<form />` 元素不能嵌套（可以用对话框（ `<Teleport to="body" />` ）将业务逻辑拆分以避免嵌套）
- HTML `<form />` 元素不会提交 `disabled` 的控件（`react-hook-form` 也是这么处理的），然而在 `strawberry-farm` 里， 只有不可见控件的值才会被裁剪。这种处理比较主观，但是如果用 `readonly` 替代，诸如 `<select>` `[type="radio"]` `[type="checkbox"]` 反而不支持这个 `readonly` 属性，真是鸡肋，所以还是按照可见即提交吧，毕竟这个年头很难见到原生 HTML `<form />` 发起真正的提交了。
- 取决于自定义控件，可支持 <kbd>Enter</kbd> 向上查找表单并发起提交，因为这是 HTML `<form />` 的默认行为。这部分因使用场景而异，存在争议。比如安卓输入法的回车的提示文本和行为很多都是“下一项”。
- `<VPicker />` 及衍生组件暂不支持<kbd>Enter</kbd>提交，<kbd>Enter</kbd>的行为是选择。

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

:::demo components/FormSignup
:::
