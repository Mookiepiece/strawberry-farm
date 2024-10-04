const a=`import { watchEffect } from 'vue';\r
import { Bag, IBag } from '../shared';\r
\r
export const bagEffect = (cb: (bag: IBag) => void) =>\r
  watchEffect(onCleanup => {\r
    const bag = Bag();\r
    onCleanup(() => bag());\r
    cb(bag);\r
  });\r
`;export{a as default};
