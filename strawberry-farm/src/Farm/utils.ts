export const 帚 = {
  remove: <T = unknown>(arr: T[], cb: (t: T) => boolean): T[] => {
    const index = arr.findIndex(cb);
    if (index !== -1) {
      return [...arr.slice(0, index), ...arr.slice(index + 1, arr.length)];
    }
    return arr;
  },
};
