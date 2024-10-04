const r=`/**\r
 * @license MIT https://github.com/streamich/react-use\r
 */\r
export type FunctionReturningPromise = (...args: any[]) => Promise<any>;\r
\r
/**\r
 * @license MIT https://github.com/streamich/react-use\r
 */\r
export type AsyncState<T> = {\r
  loading: boolean;\r
  error?: any;\r
  data?: T;\r
};`;export{r as default};
