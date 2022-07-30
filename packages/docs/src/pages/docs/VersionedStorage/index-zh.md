## Versioned Storage 版本储存

不少库推出 `useStorage`， 但或许应用需要的是一个更强的基于`Storage`的封装：

- `Versioned Storage`可以依据版本号进行升级（或者爆破），新版本数据结构变化不用担心旧数据兼容。
- 可以在组件外访问。

> 还能再进阶，拿来自欺欺人： [https://juejin.cn/post/7104301566857445412](https://juejin.cn/post/7104301566857445412)。

### Basic

::demo{basic}
