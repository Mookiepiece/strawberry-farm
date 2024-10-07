export const inc = (prefix = '') => {
  let i = 0n;
  return () => prefix + (i++).toString(36);
};

export const IndexSymbols = () => {
  const $: Symbol[] = [];
  const indexSymbols = (index: number) => $[index] || ($[index] = Symbol());
  return indexSymbols;
};
export const indexSymbols = IndexSymbols();
