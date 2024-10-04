const n=`export const inc = (prefix= '') => {\r
  let i = 0n;\r
  return () => prefix + (i++).toString(36);\r
}`;export{n as default};
