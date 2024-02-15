export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  timeout = 300,
  signal?: AbortSignal
): T => {
  let timer: number;
  return ((...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => !(signal?.aborted) && fn(...args), timeout);
  }) as T;
};
