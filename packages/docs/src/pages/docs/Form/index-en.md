## Form 表单

:::demo{basic}

### 基本用法

`Form.Item`会接管子元素`value`和`onChange`属性，且 onChange 的第一参数是值而不是事件。同时也支持传入`render props`作子元素。

`Form.Item`**仅主动输入时会自动触发校验**。**节流规则是连续输入时每次异步校验需等待上一次完成，在不提交仅输入的情况下同时只有一个异步校验在调用**。

表单传入`action`，自动校验成功后自动提交，自动校验里面的 submit 按钮会自动切换到加载状态。

:::

:::demo{computed}

### 联动

使用`project`取值。
:::

:::demo{pass}

### 监听

以重复密码示例，`element-plus`在`validator`里做校验，也可以在`useWatch`里使用`useEffect`达到同样的效果。

注意：放`validator`里校验那么在提交的时候会因为重复调用而多校验一次。

:::

:::demo{list}

### 列表

列表 key 由`Form.List`子组件管理，并提供`add` `remove` `swap`方法，注意如果使用`form.set`这种直接设置表单值 key 便不能跟着变化。

:::

:::demo{remote}

### 远程错误

这个示例里不接收以数字开头的名字，在外部调用`Form.error`将名称置错，并且改变`rules`，再次输入同样的名字也会警告。

:::

:::demo{message}

### 错误信息

`alert` 是特殊的折叠面板，默认 24px 高充当间距，当在`render props` 模式触发了 getter 后默认的 `alert` 会消失

:::

### 原理

有人分析过市面上的表单，[React 表单源码阅读笔记 ](https://zhuanlan.zhihu.com/p/352181528)。

`material-ui` 和 `chakra-ui` `semantic-ui` `react-bootstrap`等大部分不具备表单验证功能，可选的验证工具是 [`formik`](https://github.com/formium/formik)， formik 使用 [`Yup`](https://formik.org/docs/tutorial#schema-validation-with-yup) 做 Schema 验证。 `antd` 即 `rc-field-form` 和 `element/element-plus` 使用[`async-validator`](https://github.com/yiminghe/async-validator) 做 Schema 验证。

`antd` 和 `formik` 倾向使用非受控模式，即表单状态不放外边，这样的好处一个是输入时只有表单内部在重渲染。假如表单的值放外面，每次输入(即`setState`)都会引起持有该状态的组件（很可能是页面）的整体刷新。很多业务倾向于外部要访问到表单的值。比如用户输入了 a 就显示 b 输入框，这个在非受控模式是做不到的，因为外面获取不到表单里的状态。

- `antd` 默认局部刷新，因为每次更新会触发所有[Field 的回调](https://github.com/react-component/field-form/blob/e118381c2102b36c4ffe7e17a6415df091e772b7/src/Field.tsx#L216)让其各自比对新旧值判断是否需要更新，在使用[render props 模式](https://github.com/react-component/field-form/blob/e118381c2102b36c4ffe7e17a6415df091e772b7/docs/examples/renderProps.tsx#L17)此功能失效，表单整体刷新，所以文档里提示这个性能更差。
- `formik` 默认整体刷新表单，额外的优化手段是 FastField 组件，该组件有 shouldComponentUpdate 方法各自比对新旧值，能够判断是否需要更新。

[ vue 由于依赖自动收集所以不用优化](https://www.zhihu.com/question/453332049/answer/1844784032)。

表单核心和写折叠面板一样用传统的订阅模式就能解决。

`muse-ui`的源码比较精简，推荐入门阅读，然后是`element/element-plus`。

想过能不能把核心策略抽象成无样式的基本 hook 这样如果别人想基于自身的业务实现一个就可以调，但表单策略本来就是很凸显作者的个人风格，从必填的星号，到 validate 的节流策略，到提交时自动将 string field 用`trim`修剪。有时间配置这些配置项已经不如源码拷过去写一个新的了。

### 可访问性

提交失败能调用第一个控件的`scrollIntoView`和`focus`。

- 依据表单规范，支持隐式提交

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
