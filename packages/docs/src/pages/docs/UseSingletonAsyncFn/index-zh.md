## useSingletonAsyncFn 使用单例异步函数

`useSingletonAsyncFn`可以保证异步函数同时只有一个在执行，期间部分触发可能被忽略，但最后一次触发必定会执行。会抛错，请注意异常处理。

> 如果这个模式不够用，可以继续基于社区的`bluebird` ~~(nativebird)~~ 这类`Promise`扩展或者`plimited`这类异步管理池能力会更强。

### 基本用法

::demo{basic}
