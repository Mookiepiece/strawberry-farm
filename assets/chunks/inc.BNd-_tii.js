const n=`export const inc = (prefix = '') => {\r
  let i = 0n;\r
  return () => prefix + (i++).toString(36);\r
};\r
\r
export const IndexSymbols = () => {\r
  const $: Symbol[] = [];\r
  const indexSymbols = (index: number) => $[index] || ($[index] = Symbol());\r
  return indexSymbols;\r
};\r
export const indexSymbols = IndexSymbols();\r
`;export{n as default};
