## Versioned Storage

Many libs exports their `useStorage` hook， but I think we'd do sth with `Storage` itself instead:

- `Versioned Storage` can update(or explode) itself with a new version number, so you don't worry about breaking changes on the stored stale data.
- Can be used outside of `react`.

> But also, you can make it more verbose: [https://juejin.cn/post/7104301566857445412](https://juejin.cn/post/7104301566857445412)。

### Basic

::demo{basic}
