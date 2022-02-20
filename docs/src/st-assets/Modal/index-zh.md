## Modal 模态框

### 基本用法

::demo{basic}

### 接口索引

| Modal Static Property | Description                                              | Type                         |
| --------------------- | -------------------------------------------------------- | ---------------------------- |
| visible:required      |                                                          | `boolean`                    |
| onClose               |                                                          | `string`                     |
| title                 |                                                          | `string`                     |
| closable              | 显示关闭按钮                                             | `boolean`                    |
| maskClosable          | 点击背景可关闭                                           | `boolean`                    |
| width                 |                                                          | ` string / number`           |
| maxWidth              |                                                          | ` string / number`           |
| mountOnEnter          |                                                          | `boolean`                    |
| unmountOnExit         |                                                          | `boolean`                    |
| onVisibilityChange    | visible 变化时执行，虽然外面也能获取到，但这里是声名式的 | `(visible: boolean) => void` |

| Modal Static Property | Description                                                    | Type       |
| --------------------- | -------------------------------------------------------------- | ---------- |
| registry              | 当前打开的模态框 id 队列，先打开的在前                         | `number[]` |
| mitt                  | 可以从此处执行`REMOTE_CLOSE`尝试执行一个模态框的`onClose` prop |            |

### 可访问性

`Modal`使用`FocusLock`锁住焦点。

可以支持浏览器回退和前进时先把已有的模态框关闭。步骤如下：

在 App 下可设置一个`MyPrompt`管理整个应用的`Prompt`，使用`react-router-dom`时，可以使用其`history.block`接口，当使用浏览器回退和前进时界面若存在存在`Modal`，关闭`Modal`并返回 false 以阻止跳转。

`StarwberryFury Doc`的`MyPrompt`在`App.tsx`底下。

```ts
const history = useHistory();
void 0;
useEffect(() => {
  const unlock = history.block((props, action) => {
    if (action === 'POP' && Modal.registry.length) {
      Modal.Mitt.emit('REMOTE_CLOSE', Modal.registry.slice(-1)[0]);
      return false;
    }
  });

  return unlock;
});
```
