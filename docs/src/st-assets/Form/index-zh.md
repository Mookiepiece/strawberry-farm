## Form 表单

:::demo{basic}

### 基本用法

`Form.Item`会接管子元素`value`和`onChange`属性，且 onChange 的第一参数是值而不是事件。同时也支持传入`render props`作子元素。

`Form.Item`**仅主动输入时会自动触发校验**。**节流规则是连续输入时每次异步校验需等待上一次完成，在不提交仅输入的情况下同时只有一个异步校验在调用**。

第一个表单传入`action`，自动校验自动提交，自动校验里面的 submit 按钮会自动切换到加载状态。

第二个表单传入`onSubmit`，需要在外面主动校验主动为按钮切换加载状态。如果不在外面做节流就会像示例这样打两次回车提交两次。

这两个参数互斥

:::

:::demo{pass}

### 重复密码

表单项间通信，如果不是`element`有这个示例，差点就去挖坑显式监听接口了。

:::

:::demo{cuscontrol}

### 自定义控件

:::

:::demo{remote}

### 修改规则

这个示例里不接收以数字开头的名字，当不接收此参数时，调用`setValidateStatus`将名称置错，并且改变`rules`，再次输入同样的名字也会警告。

:::

:::demo{list}

### 列表

嵌套加循环

:::

:::demo{nesting}

### 假的监听

列表一节已经展示了嵌套，嵌套比起其它表单库的做法即主动用 ref 监听值更加容易，模型也更加简单。

以下讲优化：

常规情况下，你会想，这里有大小两个订阅，所以嵌套是会导致局部多次渲染的，大 Item 一次（外层的 Item），小 Item 一次（内层的 Item），导致渲染两次。就好比`react-redux hooks`一节提到的 [performance](https://github.com/reduxjs/react-redux/blame/master/docs/api/hooks.md#L410) 问题。这里`st-form`在小 Item 里触发的是大 Item 的 `onChange`，大 Item 的 `onChange` 只会更新大 Item，因为小 Item 的 `path` 比大 Item 深一层，小 Item 知道自己会‘被’刷新，所以拒绝主动刷新了。

由于嵌套必须使用 render props 写，大 Item 的刷新自动带动了创建一个新的小 Item，于是小 Item 也是新的了。

表单接管逻辑的同时也接管渲染结果，且字段都有一一对应的输入组件，使用这种嵌套策略合适。

:::

:::demo{status}

### 校验状态

`Form`之前是带有状态的，但是无缘无故去刷新状态就会渲染 3 次，多出来的两次是正在校验和校验成功状态。
可是实际用异步校验`asyncValidator`的场景还是太少了，都是同步校验的。

移除了多余重复渲染后，现在的校验状态只有没错误和错误两种，自然需要以更多的外部逻辑弥补。

:::

### 接口索引

| Form Property         | Description                                                      | Type                                                                                 |
| --------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| initialValue:required | 初始值，只认首次渲染传进去的那个                                 | `Record<string, unknown>`                                                            |
| action                | 表单验证成功后调用的方法                                         | `(value: T) => Promise<void> / void`                                                 |
| action                | 也能传数组，第一个是 action，第二个是校验失败时执行              | ` [(value: T) => Promise<void> / void, (errors: ErrorList) => Promise<void> / void]` |
| onSubmit              | 监听表单的提交，此时需要手动校验和提交和禁用按钮，和`action`互斥 | `(value: T) => void`                                                                 |

| Form Instance     | Description                    | Type                                                          |
| ----------------- | ------------------------------ | ------------------------------------------------------------- |
| setInitialValue   | 只能通过此种方式设置表单初始值 | `(initialValue?: T) => void`                                  |
| validate          | 抢占地触发表单（项）的验证     | `(names?: string[]) => Promise<T>`                            |
| reset             | 清空表单（项）的验证状态及数据 | `(names?: string[]) => void`                                  |
| set               | 设置表单的值                   | `(callback: (value: T) => T) => void`                         |
| value (getter)    | 获得表单的值                   | `T`                                                           |
| setValidateStatus | 设置某表单项的验证状态         | `(name: string, validateStatus: ValidateStatusParam) => void` |

| Form.Item Property | Description                                             | Type                    |
| ------------------ | ------------------------------------------------------- | ----------------------- |
| name:required      |                                                         | `string`                |
| label              |                                                         | `string`                |
| rules              | 查阅`async-validator`，可变，但当规则改变时不会自动校验 | `RuleItem`/`RuleItem[]` |

### 原理

确实有人快一步分析市面上的表单，[React 表单源码阅读笔记 👍](https://zhuanlan.zhihu.com/p/352181528)。

`material-ui` 和 `chakra-ui` `semantic-ui` `react-bootstrap`等大部分不具备表单验证功能，可选的验证工具是 [`formik`](https://github.com/formium/formik)， formik 使用 [`Yup`](https://formik.org/docs/tutorial#schema-validation-with-yup) 做 Schema 验证。

`antd` 即 `rc-field-form` 和 `element/element-plus` 使用[`async-validator`](https://github.com/yiminghe/async-validator) 做 Schema 验证。

`antd` 和 `formik` 倾向使用非受控模式，即表单状态不放外边，这样的好处一个是输入时只有表单内部在重渲染。

假如表单的值放外面，每次输入(即`setState`)都会引起持有该状态的组件（很可能是页面）的整体刷新。很多业务倾向于外部要访问到表单的值。比如用户输入了 a 就显示 b 输入框，这个在非受控模式是做不到的，因为外面获取不到表单里的状态。

- `antd` 默认局部刷新，因为每次更新会触发所有[Field 的回调](https://github.com/react-component/field-form/blob/e118381c2102b36c4ffe7e17a6415df091e772b7/src/Field.tsx#L216)让其各自比对新旧值判断是否需要更新，在使用[render props 模式](https://github.com/react-component/field-form/blob/e118381c2102b36c4ffe7e17a6415df091e772b7/docs/examples/renderProps.tsx#L17)此功能失效，表单整体刷新，所以文档里提示这个性能更差。
- `formik` 默认整体刷新表单，额外的优化手段是 FastField 组件，该组件有 shouldComponentUpdate 方法各自比对新旧值，能够判断是否需要更新。

[只要 vue 够快就不用优化](https://www.zhihu.com/question/453332049/answer/1844784032)。

表单核心和写折叠面板一样用传统的订阅模式就能解决。

`muse-ui`的源码比较精简，推荐入门阅读，然后是`element/element-plus`。

`starfall` 尝试过使用受控表单，感觉不合群，当遇到性能差的情况时在受控模式是没有解决办法避免的。还是希望它能适合任何场景。经过了大的重改，现在就是非受控了。所以`st-form`是高性能的。

### 可访问性

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
> 即：当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 <el-form> 标签上添加 @submit.native.prevent。
>
> https://element-plus.org/#/zh-CN/component/form
