/**
 * @license MIT https://github.com/streamich/react-use
 */
export type FunctionReturningPromise = (...args: any[]) => Promise<any>;

/**
 * @license MIT https://github.com/streamich/react-use
 */
export type AsyncState<T> = {
  loading: boolean;
  error?: any;
  data?: T;
};