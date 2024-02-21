export const inc = (prefix= '') => {
  let i = 0n;
  return () => prefix + (i++).toString(36);
}