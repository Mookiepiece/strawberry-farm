## useSingletonAsyncFn

`useSingletonAsyncFn` will make sure an async function only has no more than one active call one time, some trigger actions may be omitted, but the lastest trigger action is promised to be excuted and return the latest result.

It could throws an Error.

> Consider using promise extensions like `bluebird` ~~(nativebird)~~ or async pool management library like `plimited` if this is not what you need.

### Basic

::demo{basic}
