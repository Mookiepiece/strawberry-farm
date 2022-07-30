export declare const useSingletonAsyncFn: <F extends (...args: any[]) => Promise<any>>(fn: F) => [F, () => void];
