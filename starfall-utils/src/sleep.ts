export const sleep = (timestamp: number): Promise<void> =>
  new Promise(r => setTimeout(r, timestamp));
